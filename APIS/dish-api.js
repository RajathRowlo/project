//mini express app
const exp = require("express")
const dishApiObj = exp.Router();

//import verifytoken middleware
const verifyToken=require("./middlewares/verifyToken")

//import error handler
const errorHandler= require("express-async-handler")

//import model
const Dish = require("../models/Dish")

dishApiObj.use(exp.json())

//Cloudinary

    //imports
    const cloudinary = require("cloudinary").v2
    const { CloudinaryStorage } = require("multer-storage-cloudinary")
    const multer = require("multer")

    //config cloudinary
    cloudinary.config({
        cloud_name:'dx15jeax0',
        api_key:'458769698576647',
        api_secret:'S2OUF45kZTskm5WimdEQfKeKzoU'
    });

    //config cloudinary storage
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params:async (req,file) => {
            return {
                folder: 'cognizant',
                public_id: file.fieldname + '_' + Date.now()
            }
        }
    })

    //config multer
    var upload = multer({ storage: storage });


//create dish //http://localhost:1611/dish/createdish
dishApiObj.post("/createdish", upload.single('photo'),verifyToken, errorHandler(async(req,res) => {

    req.body=JSON.parse(req.body.dishObj)
    req.body.photo=req.file.path;
    let dishObj=req.body

    //create dishObj for dish model
    let newDishObj=new Dish({
        username:dishObj.username,
        restaurantname:dishObj.restaurantname,
        dishid:dishObj.dishid,
        dishname:dishObj.dishname,
        dishtype:dishObj.dishtype,
        dishprice:dishObj.dishprice,
        dishspeciality:dishObj.speciality,
        dishdescription:dishObj.dishdescription,
        photo:dishObj.photo
    })

    //save
    await newDishObj.save()
    
    res.send({message:"dish created"})
}))

//get admin dish http://localhost:1611/dish/getdish
dishApiObj.post("/getdish", errorHandler(async (req,res) => {

    //read all dish
    let dishArray= await Dish.find({username:req.body.username})

    //send response
    res.send({message: dishArray})
}))

//get all dish http://localhost:1611/dish/getalldish
dishApiObj.get("/getalldish", errorHandler(async (req,res) => {

    //read all dish
    let alldishArray= await Dish.find()
    res.send({message: alldishArray})
}))




dishApiObj.post('/getdishid', errorHandler(async (req, res) => {
    
      let newDataObj = (req.body)
      
    //   console.log("recieved data",newDataObj)
     const product = await Dish.findOne({$and:[{username:req.body.username}, {dishid:req.body.dishid}]})
    
        res.send({ message: product})
})
)


//update dish
dishApiObj.put("/updatedish", errorHandler(async(req,res) => {
    
    let result = await Dish.updateOne({$and:[{username:req.body.uname},{dishid:req.body.dishid}]}, {dishname:req.body.dishname, dishtype:req.body.dishtype, dishprice:req.body.dishprice, dishdescription:req.body.dishdescription})
    let updatedish = await Dish.findOne({username:req.body.uname,dishid:req.body.dishid})
    
    res.send({message:"Dish Updated"})
}))


//delete dish
dishApiObj.post("/deletedish", errorHandler(async(req,res) => {

    let result = await Dish.deleteOne({$and:[{username:req.body.username}, {dishid:req.body.dishid}]})
    
    res.send({message:"Deleted Succusfully"})
}))

//----------------------------------------------------------------------------------------
//get restaurant http://localhost:1611/dish/getrestaurant
dishApiObj.get("/getrestaurant/:restaurantname", errorHandler(async(req,res) => {
    let restaurantarray= await Dish.findOne({restaurantname:req.params.restaurantname})
    
    res.send({message: restaurantarray})
}))

module.exports=dishApiObj