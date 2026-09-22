import User from './auth.model.js'
import crypto from "node:crypto";
import ApiError from '../../common/utils/api.errors.js'
import { generateAccessToken, generateRefreshToken, genrateResetToken, verifyRefreshToken } from '../../common/utils/jwt.utils.js'
import { sendVerification } from '../../common/config/email.js'
import { hash } from 'bcrypt'
import fs from'node:fs'
import imagekit from '../../common/config/imagekit.js';

const hashtoken = (token) =>  crypto.createHash("sha256").update(token).digest("hex");




const register = async({email,password,name,role})=>{

const existing = await User.findOne({email})


if (existing) {
    throw  ApiError.conflict('Email already exist')
}


const {rawToken,hashtoken} = genrateResetToken()




const user = await User.create({
name,
email,
password,
role,
verificationToken:hashtoken

})


try {
  await sendVerification()

} catch (error) {
  console.error(error)
}
const userObj = user.toObject()

delete userObj.password
  delete userObj.verificationToken;

return userObj

}



const login = async({email, password}) =>{

const user =  await User.findOne({email}).select('+password')
if (!user) {
  throw  ApiError.forbidden("Email or password is invalid Please Check it again!")
}

const ismatch =await user.comparePassword(password)

if(!ismatch) throw  ApiError.unauthorized('Email or password is invalid Please Check it again!')

const accessToken = generateAccessToken({
  userId: user._id
});

const refreshtoken = generateRefreshToken({
  userId: user._id
});

user.refreshtoken = hashtoken(refreshtoken)


const userObj = user.toObject()


delete userObj.password
delete userObj.refreshtoken


return{user:userObj,accessToken,refreshtoken}


}



const refresh = async({token}) =>{
if (!token) {
  throw   ApiError.unauthorized('Token is missing')
}

const decoded = verifyRefreshToken(token)


const user = await User.findById(decoded.id).select('+refreshtoken')

if (!user) {
  throw new ApiError.unauthorized("User not found")
}

if (user.refreshtoken!==hashtoken(token)) {
  throw new ApiError.unauthorized('Invalid Token')
}


const accessToken = generateAccessToken({id: user._id,role: user.role})

const refreshtoken = generateRefreshToken({id: user._id,role: user.role})

return{accessToken,refreshtoken}

}



const logout = async (userId)=>{

await User.findByIdAndUpdate(userId, {refreshtoken:null})

}



const forgotPassword =async (email)=>{

const user =  await User.findOne({email})
if(!user)   throw  ApiError.unauthorized("email not existed")

  const {rawToken,hashtoken} = genrateResetToken()
user.resetPasswordtoken = resetToken

user.resetPasswordExpire = Date.now() + 15*60*1000

await user.save()
try {
  //todo mail bheja
  
} catch (error) {
  
}
return{user:resetToken}







}


const getMe = async (userId) =>{

const user = await User.findById(userId)

if (!user) {
  throw  ApiError.unauthorized('User is not valid')
}

return  user;
}


const verificationEmail = async (token) => {
  const hashedtoken = hashtoken(token);

  const user = await User.findOne({
    verificationToken: hashedtoken,
    verificationTokenExpire: { $gt: Date.now() }
  });

  if (!user) {
    throw new ApiError.unauthorized(
      "Invalid or expired verification token"
    );
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;

  await user.save();

  return user;
};


const uploadAvatar = async (file, userId) => {
  try {
    if (!file) {
      throw ApiError.badrequest("File not available");
    }

    const fileStream = fs.createReadStream(file.path);

    const uploadResponse = await imagekit.files.upload({
      file: fileStream,
      fileName: file.originalname,
      folder: "/user-avatars",
    });

    await User.findByIdAndUpdate(
      userId,
      {
        avatar: uploadResponse.url,
      },
      { new: true }
    );

    // Delete local file after successful ImageKit upload
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };

  } catch (error) {

    // Cleanup local file even if upload fails
    if (file?.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    throw error;
  }
};





export{register,login,logout,forgotPassword,getMe,verificationEmail,uploadAvatar}