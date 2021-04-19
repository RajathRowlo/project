//mini express app
const exp = require("express")
const userApiObj = exp.Router();

//import jsontoken
const jwt = require("jsonwebtoken")

//import error handler
const errorHandler = require("express-async-handler")

//import hashing password
const bcryptjs = require("bcryptjs");


//import verifytoken middleware
const verifyToken=require("./middlewares/verifyToken")

//import models
const User = require("../models/User");
const Cart = require("../models/Cart")
const Dish = require("../models/Dish")

//use body parsing middleware
userApiObj.use(exp.json())

//Create User http://localhost:2020/user/createuser
userApiObj.post("/createuser", errorHandler(async (req, res) => {

    // let userObj=req.body;

    //hash password
    let hashedPassword = await bcryptjs.hash(req.body.password, 7)

    //create user obj for user model
    let newUserObj = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,

    })

    //save
    await newUserObj.save()

    res.send({ message: "user created" })

}))

//user login
userApiObj.post("/login", errorHandler(async (req, res) => {

    let userCollObj = req.app.get("User")
    let credObj = req.body;

    //verify user
    let userFromDb = await User.findOne({ username: credObj.username })

    //if user not existed
    if (userFromDb == null) {
        res.send({ message: "Invalid username" })
    }
    //if user is existed compare password
    else {
        //compare the password
        let result = await bcryptjs.compare(credObj.password, userFromDb.password)

        //if password not match
        if (result == false) {
            res.send({ message: "Invalid password" })
        }

        //if password is match
        else {
            //create a json token and signit
            let signedToken = await jwt.sign({ username: userFromDb.username }, "secret", { expiresIn: 1000 })

            //send signed token to the client
            res.send({ message: "login succuess", token: signedToken, username: userFromDb.username })
        }
    }
}))


userApiObj.post("/addtocart",verifyToken, errorHandler(async (req, res) => {

    //search for product in db with id
    let cartObjFromDb = await Cart.findOne({ $and: [{ username: req.body.username }, { dishid: req.body.dishid }] })

    //if product doesn't exists in cart
    if (cartObjFromDb == null) {
        let newCartObj = new Cart({
            username: req.body.username,
            dishid: req.body.dishid,
            restaurantname: req.body.restaurantname,
            dishname: req.body.dishname,
            dishtype: req.body.dishtype,
            dishprice: req.body.dishprice,
            dishdescription: req.body.dishdescription,
            quantity: req.body.quantity,
            photo: req.body.photo
        })

        await newCartObj.save()
        res.send({ message: "product added to cart" })

    }
    //if product exists in the cart
    else {

        console.log(cartObjFromDb.quantity)
        let newLength = cartObjFromDb.quantity + 1

        //newLength++
        console.log(newLength)
        let cartObjFromDb2 = await Cart.findOneAndUpdate({ dishid: req.body.dishid,username:req.body.username }, { quantity: newLength })

        res.send({ message: "Quantity updated" })
    }
}))

//usercart
//get admin dish http://localhost:1611/dish/getdish
userApiObj.post("/getcart",verifyToken, errorHandler(async (req, res) => {

    //read all dish
    let dishArray = await Cart.find({ username: req.body.username })

    //send response
    res.send({ message: dishArray })
}))


userApiObj.post("/reducequantity/:username/:id", errorHandler(async (req, res) => {
    const cartObj = await Cart.findOne({ "username": req.params.username, "dishid": req.params.id })
    console.log(cartObj)
    if (cartObj) {
        cartObj.quantity--

        if (cartObj.quantity < 1) {

            const cartObj = await Cart.findOneAndDelete({ "username": req.params.username, "dishid": req.params.id })

            res.send({ message: "product removed from cart" })
        }
    }

    res.send({ message: "quantity reduced" })
    await cartObj.save()

}))

userApiObj.post("/deleteproduct", errorHandler(async (req, res) => {

    //delete product whose username is given in the path
    let result = await Cart.deleteOne({ $and: [{ username: req.body.username }, { dishid: req.body.dishid }] })
    res.send({ message: "deleted successfully" })

}))


//speciality
userApiObj.get("/getspeciality/:speciality", errorHandler(async(req,res) => {
    let specialityArray= await Dish.find({dishspeciality:req.params.speciality})
    res.send({message: specialityArray})
}))
//--------------------------------------------------------------------------------

//getcount
userApiObj.get('/getcount/:username', errorHandler(async (req, res) => {
    let count = 0;
    const cartObj = await Cart.find({ "username": req.params.username })
    
    for (let x of cartObj) {
      count += x.quantity;
    }
    res.send({ message: count })
  }))
module.exports = userApiObj;