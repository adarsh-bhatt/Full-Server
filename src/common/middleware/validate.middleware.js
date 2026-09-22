import ApiError from "../utils/api.errors.js";


const validate = (DtoClass)=>{

return(req,res,next)=>{
const {error,value} = DtoClass.validate(req.body)
if (error) {
    throw ApiError.badRequest(error.join(';'))
}
req.body= value
next()

}


}


export default validate