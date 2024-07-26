
import { Admin } from "../models/admin.model"
import bcrypt from 'bcrypt'
import env from "./env"
import { Request, Response } from "express"
import { ApiResponse, ApiError } from "./handlers"


export const createAdmin = async (_res: Request, res: Response) => {

   const uniqueId = env.adminUniqueId
   const password = env.adminPassword

   try {
      const alreadyExist = await Admin.findOne({ uniqueId })
      if (!alreadyExist) {
         const hashPassForAdmin = await bcrypt.hash(password, 10)
         const newAdmin = new Admin({ uniqueId: uniqueId, password: hashPassForAdmin })
         await newAdmin.save()
         return ApiResponse(res, 200, 'Admin created successfully')
      }
      else {
         throw new ApiError(500, 'Admin already Exists')
      }

   } catch (err: any) {
      throw new ApiError(err.statusCode || 500, err.message || 'Server is under maintence')
   }
}