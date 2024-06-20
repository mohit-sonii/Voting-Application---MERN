
import { asyncHandler } from '../utils/asyncHandler.util.js';
import { Admin } from '../models/admin.model.js';
import bcrypt from "bcrypt"
import { handleError } from '../utils/handleError.util.js';
import { User } from '../models/User.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.util.js';
import { apiResponse } from "../utils/response.util.js"
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.util.js"

export const login = asyncHandler(async (req, res) => {
     try {
          const { uniqueId, password } = req.body;
          if (!uniqueId || !password) {
               throw new handleError(400, "Incomplete credentials");
          }
          const userData = await User.findOne({ uniqueId: uniqueId })
          if (userData) {
               const validatePassword = await bcrypt.compare(password, userData.password)
               if (!validatePassword) throw new handleError(401, 'Either ID or passowrd is incorrect')
               const accessToken = generateAccessToken(userData._id)
               const refreshToken = generateRefreshToken(userData._id)
               userData.refreshToken = refreshToken
               await User.updateOne({ _id: userData._id }, { refreshToken });
               const options = {
                    httpOnly: true,
                    secure: true
               }
               return res
                    .status(200)
                    .cookie("accessToken", accessToken, options)
                    .cookie("refreshToken", refreshToken, options)
                    .json(new apiResponse(
                         200,
                         "User login successfully",
                         {
                              user: userData,
                              accessToken
                         }
                    ))
          }
          if (!userData) {
               const adminData = await Admin.findOne({ uniqueId: uniqueId });
               if (!adminData) {
                    throw new handleError(400, "Admin not found");
               }
               const isMatch = await bcrypt.compare(password, adminData.password);
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
                         "Admin login successfully",
                         {
                              user: uniqueId,
                              accessTokenForAdmin
                         },
                    ));
          }
     } catch (err) {

          throw new handleError(err, err.message || "Error while login the user", err.statusCode || 500)
     }
});

export const logout = asyncHandler(async (req, res) => {
     const options = {
          httpOnly: true,
          secure: true
     }
     return res
          .status(200)
          .clearCookie("accessToken", options)
          .clearCookie("refreshToken", options)
          .json(new apiResponse(
               200,
               {},
               "logout successfully"
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

          const user = await User.create({
               firstName: firstName.toLowerCase(),
               avatar: savedAvatar?.url || "",
               lastName: lastName.toLowerCase(),
               uniqueId,
               refreshToken: "",
               voterId,
               password: await bcrypt.hash(password, 10)
          })

          await user.save()
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

export const forgetPassword = asyncHandler(async (req, res) => {
     const { uniqueId, voterId } = req.body
     if (!uniqueId || !voterId) throw new handleError(400, "Incomplete credentials")
     const userData = await User.findOne({ uniqueId }).select("-refreshToken")
     console.log(userData, "this is user data")
     console.log(userData.voterId, " ID stroed in DB")
     if (userData) {
          if (voterId === userData.voterId) {
               res.status(200).json({ redirectUrl: `/api/v1/auth/login/forget-password/create-new-password/${req.data._id}` })
          }
          else {
               throw new handleError(400, 'Voter Id is incorrect')
          }
     } else {
          throw new handleError(400, "Id is incorrect")
     }
})

export const newPassword = asyncHandler(async (req, res) => {
     const { id } = req.params
     const { password } = req.body
     const hashPassword = await bcrypt.hash(password, 10)
     const updateData = await User.findByIdAndUpdate(id, { password: hashPassword }, { new: true })
     return res
          .status(200)
          .json(new apiResponse(
               200,
               "Password Updated Successfully",
               updateData
          ))
})