import { Admin } from "../models/admin.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { handleResponse } from "../utils/handleResponse.util.js";
export const getAdminDetails = asyncHandler(async (_, res) => {
     const adminData = await Admin.find();
     return res
          .status(200)
          .json(new handleResponse(
               200,
               "Admin Data fetched successfully",
               adminData
          ));
});
