import { name } from 'nodemailer/lib/package-info.js'
import ApiError from '../../../common/utils/api.errors.js'

import OwnerModel from '../models/Owner.model.js'



const createOwner = async ({name,company})=>{

const owner = await OwnerModel.create({name,company})



return owner
}


const getAllOwner = async()=>{

    const owner =await  OwnerModel.find()


    return owner
}


const getOwnerById = async(id)=>{

const owner = await OwnerModel.findById(id)

if (!owner) {
    throw ApiError.notFound("Owner not found")
}


return owner

}



const updateOwner = async(id,{name,company}) =>{

const owner = await OwnerModel.findByIdAndUpdate(id,{name,company},{new:true},{runValidators:true})

if (!owner) {
    throw ApiError.notFound("Owner not found")
}

return owner


}



const deleteOwner = async(id)=>{
const owner = await OwnerModel.findByIdAndDelete(id)


if (!owner) {
    throw ApiError.notFound("Owner not found")
}


return owner
}




export{getAllOwner,createOwner,getOwnerById,deleteOwner,updateOwner}