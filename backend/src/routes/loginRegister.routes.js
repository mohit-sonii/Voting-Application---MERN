
import { Router } from 'express'
import { login, logout, register,forgetPassword,newPassword } from "../controllers/loginRegister.controller.js"
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
const router = Router()

router.route('/login').post(login)
router.route('/login/forget-password').post(verifyJwt,forgetPassword)
router.route('/login/forget-password/create-new-password/:id').patch(newPassword)
router.route('/logout').post(verifyJwt, logout)
router.route('/register').post(upload.single('avatar'), register)

export default router