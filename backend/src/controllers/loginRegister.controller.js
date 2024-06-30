
import { asyncHandler } from '../utils/asyncHandler.util.js';
import { Admin } from '../models/admin.model.js';
import bcrypt from "bcrypt"
import { handleError } from '../utils/handleError.util.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.util.js';
import { response } from "../utils/response.util.js"
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.util.js"
import { Candidate } from '../models/candidate.model.js';

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
                    httpOnly: false,
                    secure: true,
                    path:'/'
                    // domain'localhost'
               }
               return res
                    .status(200)
                    .cookie("accessToken", accessToken, options)
                    .cookie("refreshToken", refreshToken, options)
                    .json(new response(
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
                    throw new handleError(400, "User with this Id does not exists");
               }
               const isMatch = await bcrypt.compare(password, adminData.password);
               if (!isMatch) {
                    throw new handleError(401, "Incorrect password");
               }
               const accessToken = generateAccessToken(adminData._id)

               const options = {
                    httpOnly: true,
                    // sameSite: 'None', 
                    secure: true,
               }

               return res
                    .status(200)
                    .cookie("accessToken", accessToken, options)
                    .json(new response(
                         200,
                         "Admin login successfully",
                         {
                              user: adminData,
                              accessToken
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
          .json(new response(
               200,
               {},
               "logout successfully"
          ))
})

export const register = asyncHandler(async (req, res) => {
     const { uniqueId, voterId, firstName, lastName, password } = req.body
     if ([uniqueId, voterId, firstName, lastName, password].some((field) => field?.trim() === "")) {
          throw Error("Fields cannot be empty")
     }
     const existsUser = await User.findOne({
          uniqueId,
          voterId
     })
     const isCandidate = await Candidate.findOne({
          uniqueId,
          voterId
     })
     const isAdmin = await Admin.findOne({ uniqueId })
     if (isAdmin) throw new handleError(400, 'User cannot be registered')
     if (isCandidate) throw new handleError(400, 'Candidate can not register')
     if (existsUser) throw Error("user with this ID already exists")
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
     const accessToken = generateAccessToken(user._id)
     const refreshToken = generateRefreshToken(user._id)
     user.refreshToken = refreshToken
     await user.save()

     const options = {
          httpOnly: true,
          secure: true,
          // sameSite: 'None'

     }
     return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(new response(
               200,
               "User Registered Successfully",
               user
          ))
})

export const forgetPassword = asyncHandler(async (req, res) => {

     try {
          const { uniqueId, voterId } = req.body
          if (!uniqueId || !voterId) throw new handleError(400, "Incomplete credentials")
          const userData = await User.findOne({ uniqueId }).select("-refreshToken")
          if (!userData) throw new handleError(400, `User with this ID doesn't exist`)
          if (userData) {
               if (voterId === userData.voterId) {
                    res.status(200).json(new response(
                         200,
                         "User verified successfully",
                         userData
                    ))
               }
               else {
                    throw new Error(400, 'Voter Id is incorrect')
               }
          } else {
               throw new Error(400, "Id is incorrect")
          }
     } catch (error) {
          throw new handleError(400, error.message || 'Error while updating the password')
     }
})

export const newPassword = asyncHandler(async (req, res) => {
     try {
          const { id } = req.params
          const { password } = req.body
          const hashPassword = await bcrypt.hash(password, 10)
          const updateData = await User.findByIdAndUpdate(id, { password: hashPassword }, { new: true })
          return res
               .status(200)
               .json(new response(
                    200,
                    "Password Updated Successfully",
                    updateData
               ))
     } catch (error) {
          throw new handleError(400, error.message || 'Error while setting up the new password')
     }
})