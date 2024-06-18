
import { Router } from 'express'
import { isAdmin, verifyJwt } from '../middlewares/auth.middleware.js'
import { addCandidate, deleteCandidate, updateCandidate } from '../controllers/candidates.controller.js'
const router = Router()

router.route('/').post(verifyJwt, isAdmin, addCandidate)
router.route('/:id').delete(verifyJwt, isAdmin, deleteCandidate)
router.route('/:id').patch(verifyJwt, isAdmin, updateCandidate)


export default router