
import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { updateUser,getUser,updateUserPassword } from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = Router()

router.route('/update').patch(verifyJwt, upload.single('avatar'), updateUser)
router.route('/update/password').patch(verifyJwt,updateUserPassword)
// router.route('/delete-account').delete(verifyJwt,deleteUser)
router.route('/').get(verifyJwt,getUser)
export default router
