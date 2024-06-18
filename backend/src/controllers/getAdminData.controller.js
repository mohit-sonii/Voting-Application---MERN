
import {Admin} from "../models/admin.model.js"
import {asyncHandler} from "../utils/asyncHandler.util.js"

export const getAdminDetails = asyncHandler(async(_,res)=>{
     const adminData = await Admin.find()
     console.log(adminData)
     return res.status(200).json(adminData)
})