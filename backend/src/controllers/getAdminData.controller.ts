import { Admin } from "../models/admin.model";
import { Request, Response } from 'express'
import { ApiResponse } from "../utils/handlers";

export const getAdminDetails = async (_req: Request, res: Response) => {
   const adminData = await Admin.find();

   return ApiResponse(res, 200, 'Admin Data fetched successfully', adminData)

};
