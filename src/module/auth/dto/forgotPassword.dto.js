import Joi from "joi";


import DtoBase from "../../../common/dto/base.dto.js";



class forgotPasswordDto extends DtoBase{

static schema = Joi.object({

password: Joi.string().min(8).required()  .messages({
    "any.required": "Password is required"
  }),

})



}


export  {forgotPasswordDto}