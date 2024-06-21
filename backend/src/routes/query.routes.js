

import { Router } from "express";
import {formData} from "../controllers/query.controller.js"

const router = Router()

router.route('/').post(formData)
export default router