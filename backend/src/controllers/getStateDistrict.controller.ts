import { DistrictState } from "../models/districtState.model"
import { ApiResponse } from "../utils/handlers"
import { Response,Request } from "express"

export const getStateDistrictsData = async (_: Request, res: Response) => {
   const data = await DistrictState.find()

   return  ApiResponse(res, 200, 'Data fetched successfully', data)
}