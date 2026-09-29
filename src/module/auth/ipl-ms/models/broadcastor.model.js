import mongoose from "mongoose";

const broadcastorSchema = new mongoose.Schema({

name:{
    type:String,
    required:[true, "Broadcastor is required"],
    trim:true,
    minlength:2,
    maxlength:100
}


},{timestamp:true})



export default mongoose.model("Broadcastor",broadcastorSchema)
