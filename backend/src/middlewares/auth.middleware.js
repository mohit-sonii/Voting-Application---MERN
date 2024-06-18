

import jwt from 'jsonwebtoken'
import { Admin } from "../models/admin.model.js"
import { asyncHandler } from '../utils/asyncHandler.util.js'
import { handleError } from '../utils/handleError.util.js'
export const verifyJwt = asyncHandler(async (req, _, next) => {

     try {0
          const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
          if (!token) throw new handleError(401, "Token is not valid", "")
          const verifyWithSecret = jwt.verify(token, process.env.accessTokenSecret)
          if (!verifyWithSecret) throw new handleError(401, "verificaiton of token failed")
          const data = await Admin.findById(verifyWithSecret._id).select("-password")
          req.data = data
          next()
     } catch (err) {
          console.log(err.message)
          throw new handleError("Error in verifyJWT", 400)
     }
})