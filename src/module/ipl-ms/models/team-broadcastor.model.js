import mongoose, { Schema } from "mongoose";


const teamBroadcastorSchema = new Schema({


teamId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Team"

},

broadcastorId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Broadcastor"
}


},{timestamp:true})

teamSponsorSchema.index({teamId:1,broadcastorId:1},{unique:true})
export default mongoose.model("Team-Broadcastor",teamBroadcastorSchema)