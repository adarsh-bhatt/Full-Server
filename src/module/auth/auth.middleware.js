import User from './auth.model.js'

import ApiError from '../../common/utils/api.errors.js'
import { verifyAccessToken } from '../../common/utils/jwt.utils.js'


const authentication = async (req,res,next)=>{
let token

if(req.headers.authorization?.startsWith('Bearer ')){

    token = req.header.authorization.split(' ')[1]
}
if (!token) throw new ApiError.unauthorized('Invalid Token')

const decoded =verifyAccessToken(token)


const user = await User.findById(decoded.id)
if (!user) throw new ApiError.unauthorized('No User Founded')

req.user = {
id: user._id,
name:user.name,
role:user.role


}


next()
}




const authorized = (...roles)=>{

return(req,res,next)=>{

if (!roles.includes(req.user.role)) {
    throw new ApiError.forbidden("You dont have permision to perform this Action")
}
next()
}

}


export{authorized,authentication}