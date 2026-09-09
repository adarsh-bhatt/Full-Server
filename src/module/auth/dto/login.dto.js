import Joi from "joi";


import DtoBase from "../../../common/dto/base.dto.js";



class LoginDto extends DtoBase{

static schema = Joi.object({

email: Joi.string().email().required(),
password: Joi.string().min(8).required()  .messages({
    "any.required": "Password is required"
  }),

})



}


export  {LoginDto}