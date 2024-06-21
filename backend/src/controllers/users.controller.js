import { asyncHandler } from "../utils/asyncHandler.util.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.util.js"
import { handleError } from "../utils/handleError.util.js";
import { apiResponse } from "../utils/response.util.js"
import { User } from "../models/user.model.js";
import { Candidate } from "../models/candidate.model.js"
import bcrypt from "bcrypt"


export const updateUser = asyncHandler(async (req, res) => {
     const updates = {}
     const currentUser = req.data

     const avatarLocalPath = req.file?.path

     if (avatarLocalPath) {
          const alreadyHaveAvatar = currentUser.avatar
          let uploadAvatar

          uploadAvatar = await uploadOnCloudinary(avatarLocalPath)
          updates.avatar = uploadAvatar.url

          if (alreadyHaveAvatar) {
               // delete the file whose publicID matched
               const deleteFile = await deleteFromCloudinary(alreadyHaveAvatar)
               if (!deleteFile) throw new handleError(400, 'Not found the file')
          }
     }

     const { currentPassword, newPassword } = req.body
     let newHashedPassword
     if (currentPassword && newPassword) {

          if (!currentPassword || !newPassword) throw new handleError(400, 'Invalid credentials')

          if ([currentPassword, newPassword].some((field) => field?.trim() === "")) {
               throw new handleError(400, 'Required fields are mandatory')
          }

          const currentUser = req.data

          const isPassCorrect = await bcrypt.compare(currentPassword, currentUser.password)
          if (!isPassCorrect) throw new handleError(400, "Password is incorrect")

          if (newPassword === currentPassword) throw new handleError(400, 'New password cannot be set as old password')
          newHashedPassword = await bcrypt.hash(newPassword, 10)

          updates.password = newHashedPassword

     }
     if (Object.keys(updates).length === 0) {
          throw new handleError(400, 'No updates provided');
     }
     const user = await User.findByIdAndUpdate(
          req.data?._id,
          {
               $set: updates

          },
          {
               new: true
          }).select("-password")


     return res.status(200)
          .json(new apiResponse(
               200,
               "Data Updated Successfully",
               user
          ))

})


export const deleteUser = asyncHandler(async (req, res) => {
     const currentUser = req.data
     if (!currentUser) throw new handleError(400, 'Verification of user failed')
     // delete the avatar
     await deleteFromCloudinary(currentUser.avatar)
     await User.findByIdAndDelete(currentUser._id)
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
               "User deleted successfully",
               {}
          ))
})


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
          .json(new apiResponse(
               200,
               "User voted successfully",
               currentUser
          ))

})