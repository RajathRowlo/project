const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    username:String,
    password:String,
    email:String
})


//Create a model
const User=mongoose.model("user",UserSchema)

//Exports the model
module.exports=User;