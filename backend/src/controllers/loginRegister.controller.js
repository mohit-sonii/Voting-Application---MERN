
import { asyncHandler } from '../utils/asyncHandler.util.js';
import { Admin } from '../models/admin.model.js';
import { handleError } from '../utils/handleError.util.js';
import { User } from '../models/User.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.util.js';
import { apiResponse } from "../utils/response.util.js"
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.util.js"

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

export const logout = asyncHandler(async (_, res) => {
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

export const register = asyncHandler(async (req, res) => {
     try {
          // extract fields from body
          const { uniqueId, voterId, firstName, lastName, password } = req.body
          // validatoin for non-empty fields
          if ([uniqueId, voterId, firstName, lastName, password].some((field) => field?.trim() === "")) {
               throw Error("Fields cannot be empty")
          }
          // verification for existed User 
          const existsUser = await User.findOne({
               uniqueId,
               voterId
          })
          if (existsUser) throw Error("user with this ID already exists")
          //chech whether user provide avatar or not
          const avatarFile = req.file?.path
          let savedAvatar
          if (avatarFile) {
               savedAvatar = await uploadOnCloudinary(avatarFile)

          }

          const user = await  User.create({
               firstName: firstName.toLowerCase(),
               avatar: savedAvatar?.url || "",
               lastName: lastName.toLowerCase(),
               uniqueId,
               refreshToken:"",
               voterId,
               password
          })

          return res
               .status(200)
               .json(new apiResponse(
                    200,
                    "User Registered Successfully",
                    user
               ))
     } catch (err) {
          throw new handleError(err, err.message || "Error while registering a user", 400)
     }
})