import * as Authservice from './auth.service.js'

import ApiResponse from '../../common/utils/api.response.js'



const register = async (req,res)=>{

const user = await Authservice.register(req.body)



ApiResponse.created(res,"User created", user)

}



const login = async(req,res) =>{

const{user,refreshtoken,accessToken} = await Authservice.login(req.body)

res.cookie('refreshToken',refreshtoken,{
httpOnly:true,
maxAge:7 * 24 *60*60*1000,
secure:true

})


res.cookie('accessToken',accessToken,{
httpOnly:true,
maxAge:7 * 24 *60*60*1000,
secure:true

})



ApiResponse.ok(res,'User Login',{user,accessToken})
}

const logout  = async(req,res) =>{

await Authservice.logout(req.user.id)


res.clearCookie('RefreshToken')

ApiResponse.ok(res,'logout Sucess')

}


const getMe =  async (req,res) =>{

const user = await Authservice.getMe(req.user.id)

ApiResponse.ok(res,'User Profile', user)

}

const forgotPassword = async(req,res) =>{
   await Authservice.forgotPassword(req.body)

  ApiResponse.ok(res,'Password Change')
}

const uploadAvatar = async (req, res) => {
    try {

        const file = req.file;

        const result = await Authservice.uploadAvatar(
            file,
            req.user.id
        );

        return ApiResponse.ok(
            res,
            "Avatar Uploaded Successfully",
            {
                avatarUrl: result.url
            }
        );

    } catch (error) {
        throw error;
    }
};

export{register,login,logout,getMe,forgotPassword,uploadAvatar}