
import { Admin } from '../models/admin.model';
import bcrypt from "bcrypt"
import { Request, Response } from 'express';
import { addCookie, removeCookie } from '../utils/cookies.util';
import { User } from '../models/user.model';
import { uploadOnCloudinary } from '../utils/cloudinary.util';
import { ApiResponse, ApiError } from '../utils/handlers';
import { generateAccessToken } from "../utils/tokens.util"
import { Candidate } from '../models/candidate.model';


export const login = async (req: Request, res: Response) => {
   try {
      const { uniqueId, password } = req.body;
      if (!uniqueId || !password) {
         throw new ApiError(400, "Incomplete credentials");
      }

      const userData = await User.findOne({ uniqueId })
      if (userData) {
         const validatePassword = await bcrypt.compare(password, userData.password)

         if (!validatePassword) throw new ApiError(401, 'Either ID or password is incorrect')
         const accessToken = generateAccessToken(userData)
         const cook = addCookie(accessToken)
         return ApiResponse(res, 200, "User logged in successfully", { data: userData, accessToken }, cook)
      }

      if (!userData) {
         const adminData = await Admin.findOne({ uniqueId });

         if (!adminData) {
            throw new ApiError(400, "User with this Id does not exists");
         }

         const isMatch = await bcrypt.compare(password, adminData.password);
         if (!isMatch) {
            throw new ApiError(401, "Incorrect password");
         }

         const token = generateAccessToken(adminData)
         const cookie = addCookie(token)
         return ApiResponse(res, 200, 'Admin login successfully', { user: adminData, token }, cookie)
      }

   } catch (err: any) {
      throw new ApiError(err.statusCode || 500, err.message || "Error while login the user")
   }
};

export const logout = async (_req: Request, res: Response) => {
   const clearCookies = removeCookie()
   return ApiResponse(res, 200, 'Logout successfully', null, null, clearCookies)
}

export const register = async (req: Request, res: Response) => {

   const { ...rest } = req.body

   for (const i in rest) {
      const value = rest[i]
      if (typeof value === 'string' && value.trim().length === 0) {
         throw new ApiError(400, 'Required fields are mandatory')
      }
   }

   const existsUser = await User.findOne({
      uniqueId: rest.unqiueId,
      voterId: rest.voterId
   })

   const isCandidate = await Candidate.findOne({
      uniqueId: rest.unqiueId,
      voterId: rest.voterId
   })

   const isAdmin = await Admin.findOne({ uniqueId: rest.uniqueId })

   if (isAdmin) throw new ApiError(400, 'User cannot be registered')
   if (isCandidate) throw new ApiError(400, 'Candidate can not register')
   if (existsUser) throw new ApiError(400, "User with this ID already exists")

   const avatarFile = req.file?.path
   let savedAvatar

   if (avatarFile) {
      savedAvatar = await uploadOnCloudinary(avatarFile)
   }

   const user = await User.create({
      firstName: rest.firstName.toLowerCase(),
      avatar: savedAvatar?.url || "",
      lastName: rest.lastName.toLowerCase(),
      uniqueId: rest.uniqueId,
      voterId: rest.voterId,
      password: await bcrypt.hash(rest.password, 10)
   })
   await user.save()

   const token = generateAccessToken(user)
   const cookie = addCookie(token)

   return ApiResponse(res, 200, "User registered successfully", user, cookie)

}

export const forgetPassword = async (req: Request, res: Response) => {
   try {
      const { uniqueId, voterId } = req.body

      if (!uniqueId || !voterId) throw new ApiError(400, "Incomplete credentials")
      const userData = await User.findOne({ uniqueId })

      if (!userData) throw new ApiError(400, `User with this ID doesn't exist`)

      if (userData) {
         if (voterId === userData.voterId) {
            return ApiResponse(res, 200, "User verified successfully", userData)
         }
         else {
            throw new ApiError(400, 'Voter Id is incorrect')
         }
      } else {
         throw new ApiError(400, "Id is incorrect")
      }
   } catch (error: any) {
      throw new ApiError(error.statusCode || 400, error.message || 'Error while updating the password')
   }
}

export const newPassword = async (req: Request, res: Response) => {
   try {
      const { id } = req.params
      const { password } = req.body
      const hashPassword = await bcrypt.hash(password, 10)
      const updateData = await User.findByIdAndUpdate(id, { password: hashPassword }, { new: true })

      return ApiResponse(res, 200, "Password updated successfully", updateData)
   } catch (error: any) {
      throw new ApiError(error.statusCode || 400, error.message || 'Error while setting up the new password')
   }
}