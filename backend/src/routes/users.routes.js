
import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { updateUser,deleteUser } from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = Router()

router.route('/profile/update').patch(verifyJwt, upload.single('avatar'), updateUser)
router.route('/profile/delete-account').delete(verifyJwt,deleteUser)
// router.route('/voting').post(verifyJwt,voteCandidate)

export default router