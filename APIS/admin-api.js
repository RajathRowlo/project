//mini express app
const exp = require("express")
const adminApiObj = exp.Router();

//import jsontoken
const jwt= require("jsonwebtoken")

//import error handler
const errorHandler = require("express-async-handler")

//import hashing password
const bcryptjs = require("bcryptjs");

//import models
const Admin = require("../models/Admin");

//use body parsing middleware
adminApiObj.use(exp.json())

//Create User http://localhost:4000/user/createuser
adminApiObj.post("/createadmin", errorHandler(async(req,res) => {

    // let userObj=req.body;
    
    //hash password
    let hashedPassword=await bcryptjs.hash(req.body.password,7)
    
    //create user obj for user model
    let newAdminObj=new Admin({
        username:req.body.username,
        password:hashedPassword,
        email:req.body.email,
        
    })

    //save
    await newAdminObj.save()

    res.send({message:"admin created"})

}))


//admin login
adminApiObj.post("/login", errorHandler(async (req,res) => {

    let userCollObj = req.app.get("Admin")
    let credObj = req.body;

    //verify user
    let adminFromDb= await Admin.findOne({username:credObj.username})
    
    //if user not existed
    if (adminFromDb==null){
        res.send({message:"Invalid adminname"})
    }
    //if user is existed compare password
    else {
        //compare the password
        let result= await bcryptjs.compare(credObj.password, adminFromDb.password)

        //if password not match
        if(result==false){
            res.send({message:"Invalid password"})
        }

        //if password is match
        else{
            //create a json token and signit
            let signedToken=await jwt.sign({username:adminFromDb.username},"secret",{expiresIn: 1000})

            //send signed token to the client
            res.send({message:"login succuess", token:signedToken, username:adminFromDb.username})
        }
    }
}))

module.exports=adminApiObj;
