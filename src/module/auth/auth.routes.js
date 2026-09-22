import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";

import * as  authController from './auth.controller.js' 
import { LoginDto } from "./dto/login.dto.js";
import { authentication, authorized } from "./auth.middleware.js";
import { forgotPasswordDto } from "./dto/forgotPassword.dto.js";
import { upload } from "../../common/middleware/multer.middleware.js";
const router = Router()

router.post('/register', validate(RegisterDto), authController.register)
router.post('/login', validate(LoginDto),authController.login)
router.post('/logout',authentication,authController.logout)
router.post('/forgot-Password',validate(forgotPasswordDto),authController.forgotPassword)
router.get('/getMe',authentication, authController.getMe)
router.post('/upload',authentication, upload.single("avatar"),authController.uploadAvatar)

export default router;