
// this is just to understand how can i get the data from a specific collection. So for that we will create a route to access the data and doing it more clearly we use a controller for admin 

import { Router } from 'express'
import { getAdminDetails } from "../controllers/getAdminData.controller.js"
import { getStateDistrictsData } from "../controllers/getStateDistrict.controller.js"
import { getCandidate, getSpecificCandidate } from '../controllers/candidates.controller.js'
const router = Router()

// GET admin Data
router.route('/admin-data').get(getAdminDetails)
// GET District State List
router.route('/district-state').get(getStateDistrictsData)
// GET Candidates List
router.route('/').get(getCandidate)
// GET a specific Candidate
router.route('/:id').get(getSpecificCandidate)

export default router