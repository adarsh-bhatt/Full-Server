import mongoose, { Schema } from "mongoose";


const teamSponsorSchema = new Schema({


teamId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Team"

},

sponsorId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Sponsor"
}


},{timestamp:true})

teamSponsorSchema.index({teamId:1,sponsorId:1},{unique:true})
export default mongoose.model("Team-Sponsor",teamSponsorSchema)