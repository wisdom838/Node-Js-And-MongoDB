var mongoose=require("mongoose");
const Schema=mongoose.Schema;

const Usersschema=new Schema({
    
name:String,   //(or) name:{type:String,required:true}
email:String,
mobile:Number,
gender:String,
date: {
    type: Date,
    default: new Date()
}

})
module.exports =mongoose.model("users",Usersschema);