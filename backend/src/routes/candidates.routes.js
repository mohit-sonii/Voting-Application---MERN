
import { Router } from 'express'
import { isAdmin, verifyJwt } from '../middlewares/auth.middleware.js'
import { addCandidate, deleteCandidate, updateCandidate } from '../controllers/candidates.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
const router = Router()

router.route('/').post(
     upload.single('avatar'),
     verifyJwt,
     isAdmin,
     addCandidate)
router.route('/:id').delete(verifyJwt, isAdmin, deleteCandidate)
router.route('/:id').patch(verifyJwt, isAdmin, upload.single('avatar'), updateCandidate)


export default router