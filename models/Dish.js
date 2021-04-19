const mongoose = require("mongoose")

const DishSchema = new mongoose.Schema({
    username:String,
    dishid:String,
    restaurantname: String,
    dishname:String,
    dishtype:String,
    dishprice:String,
    dishspeciality:String,
    dishdescription:String,
    photo:String

})

//create model
const Dish=mongoose.model("dish",DishSchema)

//exports models
module.exports=Dish;