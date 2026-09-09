import Joi from "joi";

import DtoBase from "../../../common/dto/base.dto.js";



class RegisterDto extends DtoBase{

static schema = Joi.object({

name: Joi.string().trim().min(2).max(50).required(),
email: Joi.string().email().required(),
password: Joi.string()
  .min(8)
  .required()
  .messages({
    "string.min": "Password should be minimum 8 chars",
  }),role: Joi.string().valid('customer','seller').default('customer')      // always rememeber joi k rules k according messegae ko is format m likho



})



}



export default RegisterDto