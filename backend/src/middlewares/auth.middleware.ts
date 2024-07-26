

import jwt from 'jsonwebtoken'
import { Admin } from "../models/admin.model"
import { User } from '../models/user.model'
import env from '../utils/env'
import { JWT } from '../utils/types.util'
import { ApiError } from '../utils/handlers'
import { NextFunction, Response, Request } from 'express'


export const verifyJwt = async (req: Request, _: Response, next: NextFunction) => {
   try {

      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
      if (!token) throw new ApiError(401, "Unauthorized to access this route")

      const verifyWithSecret = jwt.verify(token, env.accessTokenSecret) as JWT
      if (!verifyWithSecret) throw new ApiError(401, "verificaiton of token failed")

      let userCheck = await User.findById(verifyWithSecret._id)
      if (userCheck) {
         req.data = userCheck
         return next()
      }
      let adminCheck = await Admin.findById(verifyWithSecret._id)
      if (adminCheck) {
         req.data = adminCheck
         return next()
      }
      throw new ApiError(400, "Unauthorized Access")
   } catch (err: any) {
      throw new ApiError(err.statusCode || 500, err.message || "Server is under maintence")
   }
}


export const isAdmin = async (req: Request, _res: Response, next: NextFunction) => {
   try {
      const tokenData = req.data
      const ifAdmin = await tokenData.role
      if (ifAdmin == 'admin')  return next()

      throw new ApiError(401, "You are not authorized to access this route")
   } catch (err:any) {
      throw new ApiError(err.statusCode || 500, err.message ||'Server is under maintence')
   }
}