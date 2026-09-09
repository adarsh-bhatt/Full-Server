import crypto from 'crypto'

import jwt from 'jsonwebtoken'



const generateAccessToken = (paylord) =>{

return jwt.sign(paylord, process.env.JWT_ACCESS_SECRET,{

    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m'
})
}

const verifyAccessToken = (token) =>{
jwt.verify(token, process.env.JWT_ACCESS_SECRET)
}



const generateRefreshToken = (paylord)=>{
return jwt.sign(paylord,process.env.JWT_REFRESH_SECRET,{

expiresIn:process.env.JWT_REFRESH_REFRESH_IN ||'7d'   
})

}

const verifyRefreshToken = (token) =>{

return jwt.verify(token, process.env.JWT_REFRESH_SECRET)

}






const genrateResetToken = () =>{

const rawToken = crypto.randomBytes(32).toString('hex')
const hashtoken = crypto.createHash('sha256').update(rawToken).digest


return{rawToken, hashtoken}

}

export{
generateAccessToken,
verifyAccessToken,
generateRefreshToken,verifyRefreshToken,
genrateResetToken

}