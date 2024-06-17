
// this is just to understand how can i get the data from a specific collection. So for that we will create a route to access the data and doing it more clearly we use a controller for admin 

import { Router } from 'express'
import { getAdminDetails } from "../controllers/getAdminData.controller.js"
import { getStateDistrictsData } from "../controllers/getStateDistrict.controller.js"
const router = Router()

router.route('/admin-data').get(getAdminDetails)
router.route('/district-state').get(getStateDistrictsData)


export default router