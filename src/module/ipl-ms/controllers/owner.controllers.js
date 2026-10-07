import ApiResponse from "../../../common/utils/api.response.js";
import * as ownerservice from '../services/owner.service.js'



const createOwner = async(req,res)=>{

    const owner = await ownerservice.createOwner(req.body)

ApiResponse.created(res,"Owner Created", owner)

}



const getAllOwner = async(req,res)=>{

    const owner = await ownerservice.getAllOwner()

    ApiResponse.ok(res,"Owner Details",owner)

}




const getOwnerById = async(req,res)=>{

const owner = await ownerservice.getOwnerById(req.params.id)

ApiResponse.ok(res,"Owner get by id",owner)

}


const updateOwner = async(req,res)=>{

const owner = await ownerservice.updateOwner(req.params.id,req.body)
ApiResponse.ok(res,"Owner detail got updated", owner)
}


const deleteOwner = async(req,res)=>{

await ownerservice.deleteOwner(req.params.id)


ApiResponse.ok(res,"Owner deleted Sucessfully")

} 


export{createOwner,getAllOwner,getOwnerById,updateOwner,deleteOwner}