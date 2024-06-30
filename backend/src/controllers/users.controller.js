import { asyncHandler } from "../utils/asyncHandler.util.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.util.js"
import { handleError } from "../utils/handleError.util.js";
import { handleResponse } from "../utils/handleResponse.util.js"
import { User } from "../models/user.model.js";
import { Candidate } from "../models/candidate.model.js"
import bcrypt from "bcrypt"


export const getUser = asyncHandler(async (req, res) => {
     const currentUser = req.data
     if (!currentUser) throw new handleError(400, 'User is not authourized')
     return res
          .status(200)
          .json(new handleResponse(
               200,
               "User data is fetched",
               currentUser
          ))
})


export const updateUser = asyncHandler(async (req, res) => {
     const { firstName, lastName } = req.body
     let updates = {}

     const currentUser = req.data

     const avatarLocalPath = req.file?.path

     if (avatarLocalPath) {
          const alreadyHaveAvatar = currentUser.avatar
          let uploadAvatar

          uploadAvatar = await uploadOnCloudinary(avatarLocalPath)
          updates.avatar = uploadAvatar.url

          if (alreadyHaveAvatar) {
               const deleteFile = await deleteFromCloudinary(alreadyHaveAvatar)
               if (!deleteFile) throw new handleError(400, 'Not found the file')
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
          }).select("-password -refreshToken -role")


     return res.status(200)
          .json(new handleResponse(
               200,
               "Data Updated Successfully",
               user
          ))

})


export const updateUserPassword = asyncHandler(async (req, res) => {
     const { currentPassword, newPassword, confirmNewPassword } = req.body
     let newHashedPassword
     let currentUser = req.data

     if (!currentPassword || !newPassword || !confirmNewPassword) throw new handleError(400, 'Invalid credentials')

     if ([currentPassword, newPassword, confirmNewPassword].some((field) => field?.trim() === "")) {
          throw new handleError(400, 'Required fields are mandatory')
     }
     const isPassCorrect = await bcrypt.compare(currentPassword, currentUser.password)
     if (!isPassCorrect) throw new handleError(400, "Password is incorrect")

     if (newPassword === currentPassword) throw new handleError(400, 'New password cannot be set as old password')

     if (!newPassword === confirmNewPassword) throw new handleError(400, 'Password does not match')
     newHashedPassword = await bcrypt.hash(newPassword, 10)

     const updatedUserPass = await User.findByIdAndUpdate(
          req.data?._id,
          {
               password: newHashedPassword

          },
          {
               new: true
          }).select("-password -refreshToken -role")
     return res
          .status(200)
          .json(new handleResponse(
               200,
               "Password Updated Successfully",
               updatedUserPass
          ))

})



// this functionality is not done in frontend
// export const deleteUser = asyncHandler(async (req, res) => {
//      const currentUser = req.data
//      if (!currentUser) throw new handleError(400, 'Verification of user failed')
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


export const voteCandidate = asyncHandler(async (req, res) => {
     const currentUser = req.data
     if (currentUser.isVoted) throw new handleError(400, 'User Already Voted')

     const { candidateId } = req.body
     if (!candidateId) throw new handleError(400, 'Candidate does not exist')

     const candidateData = await Candidate.findById(candidateId)
     if (!candidateData) throw new handleError(400, "Candidate not found")

     candidateData.votedUsers.push(currentUser._id)
     candidateData.votesCount += 1
     await candidateData.save()
     currentUser.isVoted = true
     await currentUser.save()
     return res
          .status(200)
          .json(new handleResponse(
               200,
               "User voted successfully",
               currentUser
          ))

})