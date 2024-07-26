import { Response, Request } from "express";
import { Query } from "../models/query.model";
import { ApiError, ApiResponse } from "../utils/handlers";


export const formData = async (req: Request, res: Response) => {
   const { ...rest } = req.body

   for (const i in rest) {
      const value = rest[i]
      if (typeof value === 'string' && value.trim().length === 0) {
         throw new ApiError(400, 'No fields can left empty')
      }
   }
   
   const alreadySent = await Query.findOne({ email: rest.email })
   if (alreadySent) throw new ApiError(400, 'Already Submitted')

   const saveQuery = await Query.create({
      username: rest.username,
      phone: rest.phone,
      email: rest.email,
      district: rest.district,
      state: rest.state,
      queryType: rest.queryType,
      message: rest.message
   })
   return ApiResponse(res, 200, "Thanks for the Submission, we will hear you soon", saveQuery)
}