import mongoose from "mongoose";


const playerSchema = new mongoose.Schema({


name:{
    type:String,
    required:[true, "Owner is required"],
    trim:true,
    minlength:2,
    maxlength:100
},

role:{

    type:String,
    required:[true, "role  is required"],
    enum:["Batsman","Bowler","WicketKeeper","All-rounder"]

},


teamId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Team"

}

},{timestamp:true})



export default mongoose.model("Player",playerSchema)