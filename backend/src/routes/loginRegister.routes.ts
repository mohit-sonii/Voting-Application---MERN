
import { Router } from 'express'
import { login, logout, register,forgetPassword,newPassword } from "../controllers/loginRegister.controller"
import { verifyJwt } from '../middlewares/auth.middleware'
import { upload } from '../middlewares/multer.middleware'
const router = Router()

router.route('/login').post(login)
router.route('/login/forget-password').post(forgetPassword)
router.route('/login/forget-password/create-new-password/:id').patch(newPassword)
router.route('/logout').post(verifyJwt, logout)
router.route('/register').post(upload.single('avatar'), register)

export default router