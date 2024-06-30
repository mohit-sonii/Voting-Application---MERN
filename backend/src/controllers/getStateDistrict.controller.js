import { DistrictState } from "../models/districtState.model.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"
import { response } from "../utils/response.util.js"
export const getStateDistrictsData = asyncHandler(async (_, res) => {
     const data = await DistrictState.find()
     return res.status(200).json(new response(
          200,
          "Data fetched Successfully",
          data
     ))
})