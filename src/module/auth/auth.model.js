import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
name:{
type:String,
trim:true,
required: [true,'name is required'],
maxlength:50,
minLength:2

},


email:{
type:String,
trim:true,
unique:true,
lowercase:true,
required: [true,'email is required'],

},
password:{
type:String,
required: [true,'email is required'],
minLength:8,
select:false
//

},
role: {
  type: String,
  enum: ["customer", "seller", "admin"],
  default: "customer"
},
isVerified:{

    type:Boolean,
    default:false
},

verificationToken:{
    type:String,
    select:false
},
refreshtoken:{
    type:String,
    select:false
},
resetPasswordtoken:{
    type:String,
    select:false
},
resetPasswordExpire:{
    type:Date,
    select:false
}




},{timestamps:true})




userSchema.pre("save", async function () {

  if (!this.isModified("password")) return ;

  this.password = await bcrypt.hash(this.password, 12);

  
});


userSchema.methods.comparePassword = async function(clearTextPassword) {
    return bcrypt.compare(clearTextPassword,this.password)
}


export default mongoose.model('USER', userSchema)