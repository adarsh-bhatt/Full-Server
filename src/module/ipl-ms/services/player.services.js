import playerModel from "../models/player.model.js";

import ApiError from "../../../common/utils/api.errors.js";

import TeamModel from "../models/Team.model.js";

const createPlayer =async  (name,role) =>{

const player = await playerModel.create({name,role})

return player

}


const getAllPlayer = async ()=>{

    const player  = await playerModel.find()

    return player
}



const getPlayerById = async (id)=>{

    const player = await playerModel.findById(id)


if (!player) {
    throw ApiError.notFound("Player not founded")
}

return player
}


const updatePlayer =async  (id,{name,role})=>{

const player =  await playerModel.findByIdAndUpdate(id,{name,role},{new:true},{runValidator:true})

if (!player) {
        throw ApiError.notFound("Player not founded")

}
return player

}


const deletePlayer = async (id)=>{

const player = await playerModel.findByIdAndDelete(id)

if (!player) {
    throw ApiError.notFound("Player not found")
}

return player

}

const transferPlayer =async(playerId,newTeamId)=>{

const team  = await TeamModel.findById(newTeamId)

if (!team) {
    throw ApiError.notFound("Team not founded")
}


const player = await playerModel.findByIdAndUpdate(playerId,{teamId:newTeamId},{new:true},{runValidator:true}).populate("teamId","name")
if (!player) {
        throw ApiError.notFound("Player not founded")

}



return player
}


