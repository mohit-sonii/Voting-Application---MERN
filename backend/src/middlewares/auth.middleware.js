

import jwt from 'jsonwebtoken'
import { Admin } from "../models/admin.model.js"
import { asyncHandler } from '../utils/asyncHandler.util.js'
import { handleError } from '../utils/handleError.util.js'
export const verifyJwt = asyncHandler(async (req, _, next) => {

     try {
          // token extraction and validation
          const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
          if (!token) throw new handleError(401, "Token is not valid", "")
          // token verification
          const verifyWithSecret = jwt.verify(token, process.env.accessTokenSecret)
          if (!verifyWithSecret) throw new handleError(401, "verificaiton of token failed")
          // database lookup
          const data = await Admin.findById(verifyWithSecret._id).select("-password -uniqueId")
          // atach data with req.data
          req.data = data
          next()
     } catch (err) {
          throw new handleError(err, "Error in verifyJWT", 500)
     }
})
export const isAdmin = asyncHandler(async (req, _,next) => {
     try {
          const tokenData = req.data
          const ifAdmin = await tokenData.role
          if (ifAdmin == 'admin') next()
          else throw new handleError(401, "You are not authorized to access this route")
     } catch (err) {
          throw new handleError(err, 'error in isAdmin', 500)
     }
})