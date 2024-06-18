
import { asyncHandler } from '../utils/asyncHandler.util.js';
import { Admin } from '../models/admin.model.js';
import { handleError } from '../utils/handleError.util.js';
import { apiResponse } from "../utils/response.util.js"
import { generateAccessToken } from "../utils/tokens.util.js"

export const login = asyncHandler(async (req, res) => {
     const { uniqueId, password } = req.body;
     if (!uniqueId || !password) {
          throw new handleError(400, "Incomplete credentials");
     }
     const adminData = await Admin.findOne({ uniqueId: uniqueId });
     if (!adminData) {
          console.log('No ID matches the given ID');
          throw new handleError(404, "Admin not found");
     }
     const isMatch = await adminData.isPasswordCorrect(password);
     if (!isMatch) {
          throw new handleError(401, "Incorrect password");
     }
     const accessTokenForAdmin = generateAccessToken(adminData._id)
     console.log(accessTokenForAdmin)

     const options = {
          httpOnly: true,
          secure: true
     }


     // If the password matches, proceed with login logic
     return res
          .status(200)
          .cookie("accessToken", accessTokenForAdmin, options)
          .json(new apiResponse(
               200,
               {
                    user: uniqueId, accessTokenForAdmin
               },
               "Admin login successfully"
          ));
});

export const logout = asyncHandler(async (req, res) => {
     const options = {
          httpOnly: true,
          secure: true
     }
     return res
          .status(200)
          .clearCookie("accessToken", options)
          .json(new apiResponse(
               200,
               {},
               "logout admin successfully"
          ))
})