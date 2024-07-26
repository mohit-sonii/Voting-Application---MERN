import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.util"
import { Candidate } from "../models/candidate.model"
import { User } from "../models/user.model";
import bcrypt from "bcrypt"
import { Updates } from "../utils/types.util";
import { Response, Request } from "express";
import { ApiError, ApiResponse } from "../utils/handlers";

export const getUser = async (req: Request, res: Response) => {
   const currentUser = req.data
   if (!currentUser) throw new ApiError(400, 'User is not authourized')
   return ApiResponse(res, 200, 'User data fetched successfully', currentUser)
}

export const updateUser = async (req: Request, res: Response) => {
   const { firstName, lastName } = req.body
   let updates: Updates = {}

   const currentUser = req.data

   const avatarLocalPath = req.file?.path

   if (avatarLocalPath) {
      const alreadyHaveAvatar = currentUser.avatar
      let uploadAvatar

      uploadAvatar = await uploadOnCloudinary(avatarLocalPath)
      updates.avatar = uploadAvatar.url

      if (alreadyHaveAvatar) {
         const deleteFile = await deleteFromCloudinary(alreadyHaveAvatar)
         if (!deleteFile) throw new ApiError(400, 'Not found the file')
      }
   }

   if (firstName) {
      updates.firstName = firstName;
   }

   if (lastName) {
      updates.lastName = lastName;
   }
   const user = await User.findByIdAndUpdate(
      req.data?._id,
      {
         $set: updates

      },
      {
         new: true
      }
   ).select("-password -role")

   return ApiResponse(res, 200, 'Data fetched successfully', user)
}


export const updateUserPassword = async (req: Request, res: Response) => {
   const { ...rest } = req.body
   let newHashedPassword
   let currentUser = req.data

   if (!rest.currentPassword || !rest.newPassword || !rest.confirmNewPassword) throw new ApiError(400, 'Invalid credentials')

   for (const i in rest) {
      const value = rest[i]
      if (typeof value === 'string' && value.trim().length === 0) {
         throw new ApiError(400, 'Required fields are mandatory')
      }
   }
   const isPassCorrect = await bcrypt.compare(rest.currentPassword, currentUser.password)
   if (!isPassCorrect) throw new ApiError(400, "Password is incorrect")

   if (rest.newPassword === rest.currentPassword) throw new ApiError(400, 'New password cannot be set as old password')

   if (!rest.newPassword === rest.confirmNewPassword) throw new ApiError(400, 'Password does not match')
   newHashedPassword = await bcrypt.hash(rest.newPassword, 10)

   const updatedUserPass = await User.findByIdAndUpdate(
      req.data?._id,
      {
         password: newHashedPassword

      },
      {
         new: true
      }
   ).select("-password -role")

   return ApiResponse(res, 200, 'Password updated successfully', updatedUserPass)
}



// this functionality is not done in frontend
// export const deleteUser = async (req, res) => {
//      const currentUser = req.data
//      if (!currentUser) throw new ApiError(400, 'Verification of user failed')
//      // delete the avatar
//      await deleteFromCloudinary(currentUser.avatar)
//      await User.findByIdAndDelete(currentUser._id)
//      const options = {
//           httpOnly: true,
//           secure: true
//      }
//      return res
//           .status(200)
//           .clearCookie("accessToken", options)
//           .clearCookie("refreshToken", options)
//           .json(new handleResponse(
//                200,
//                "User deleted successfully",
//                {}
//           ))
// })


export const voteCandidate = async (req: Request, res: Response) => {
   try {
      const currentUser = req.data
      if (currentUser.isVoted) throw new ApiError(400, 'User Already Voted')

      const { candidateId } = req.params
      if (!candidateId) throw new ApiError(400, 'Candidate does not exist')

      const candidateData = await Candidate.findById(candidateId)
      if (!candidateData) throw new ApiError(400, "Candidate not found")

      candidateData.votedUsers = candidateData.votedUsers || []
      candidateData.votedUsers.push(currentUser._id)
      
      candidateData.votesCount = (candidateData.votesCount || 0) + 1
      
      await candidateData.save()

      currentUser.isVoted = true
      await currentUser.save()

      return ApiResponse(res, 200, 'Thanks for voting, Your submission recorded successfully', currentUser)

   } catch (error: any) {
      throw new ApiError(error.statusCode || 500, error.message || 'Server is under maintainence')
   }
}