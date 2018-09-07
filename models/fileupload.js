var mongoose=require("mongoose");
const Schema=mongoose.Schema;

const fileupload=new Schema({
    
fname:String,   //(or) name:{type:String,required:true}

})
module.exports =mongoose.model("files",fileupload);