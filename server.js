const exp = require("express")
const app = exp()
require("dotenv").config()

//import mongoose
const mongoose = require("mongoose")

//connect to mongoose
mongoose.connect(process.env.DBURL,{userNewParser:true,useUnifiedTopology:true})

//get default connection object
const db = mongoose.connection
db.on('error', () => console.log("error in DB connection"));
db.once('open', () => console.log("DB connected"));

//import error handler
const errorHandler= require("express-async-handler")

//import path module
const path = require("path")

//merge this folder to dist
app.use(exp.static(path.join(__dirname,'dist/onlinefood')))

//importing APIOBJ
const userApiObj=require("./APIS/user-api")
const adminApiObj=require("./APIS/admin-api")
const dishApiObj=require("./APIS/dish-api")

app.use("/user", userApiObj)
app.use("/admin", adminApiObj)
app.use("/dish",dishApiObj)

//invalid paths
app.use((req,res,next) => {
    res.send({message: `${req.url} is not valid`})
})

//error handler
app.use((req,res,next) => {
    res.send({message:"error occurred", reason:err.message})
})

const port = process.env.PORT||8080;
//port listen on 1611
app.listen(port, () => {
    console.log(`web server listening on port ${port}`)
})