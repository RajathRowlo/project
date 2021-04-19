const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({

    username:String,
    password:String,
    email:String
})


//Create a model
const Admin=mongoose.model("admin",AdminSchema)

//Exports the model
module.exports=Admin;