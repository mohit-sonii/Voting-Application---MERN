

import jwt from 'jsonwebtoken'
import { Admin } from "../models/admin.model.js"
import { asyncHandler } from '../utils/asyncHandler.util.js'
import { handleError } from '../utils/handleError.util.js'
import { User } from '../models/user.model.js'



export const verifyJwt = asyncHandler(async (req, _, next) => {
     try {
          // token extraction and validation
          const token = localStorage.getItem('accessToken') || req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
          if (!token) throw new handleError(401, "Token is not valid", "")
          // token verification
          const verifyWithSecret = jwt.verify(token, process.env.accessTokenSecret)
          if (!verifyWithSecret) throw new handleError(401, "verificaiton of token failed")
          // database lookup
          let data
          let userCheck = await User.findById(verifyWithSecret._id).select("-refreshToken")
          if (userCheck) {
               req.data = userCheck
               return next()
          }
          let adminCheck = await Admin.findById(verifyWithSecret._id)
          if (adminCheck) {
               req.data = adminCheck
               return next()
          }
          throw new handleError(400, "Invalid Token Details")
     } catch (err) {
          throw new handleError(500, err.message || "Error in verifyJWT")
     }
})


export const isAdmin = asyncHandler(async (req, _, next) => {
     try {
          const tokenData = req.data
          const ifAdmin = await tokenData.role
          if (ifAdmin == 'admin') next()
          else throw new handleError(401, "You are not authorized to access this route")
     } catch (err) {
          throw new handleError(err, 'error in isAdmin', 500)
     }
})