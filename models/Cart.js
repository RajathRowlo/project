const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
     username:String,
    dishid:String,
    restaurantname: String,
    dishname:String,
    dishtype:String,
    dishprice:String,
    dishdescription:String,
    quantity:{type:Number,default:1},
    photo:String
})

//create model
const Cart=mongoose.model("cart",CartSchema)

//exports models
module.exports=Cart;