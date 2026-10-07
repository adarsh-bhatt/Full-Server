import { Router } from "express";
import * as ownerController from '../controllers/owner.controllers.js'

const router = Router()


router.post('/',ownerController.createOwner)


router.get("/",ownerController.getAllOwner)

router.get("/:id",ownerController.getOwnerById)

router.put("/:id",ownerController.updateOwner)


router.delete("/:id",ownerController.deleteOwner)


export default router