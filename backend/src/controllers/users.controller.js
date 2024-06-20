import { asyncHandler } from "../utils/asyncHandler.util.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.util.js"
import { handleError } from "../utils/handleError.util.js";
import { apiResponse } from "../utils/response.util.js"
import { User } from "../models/User.model.js";
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
               // extract the public ID from the url
               const publicIdMatch = alreadyHaveAvatar.match(/\/upload\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/);
               if (!publicIdMatch || publicIdMatch.length < 3) {
                    throw new Error('Invalid Cloudinary URL');
               }

               //find the folder
               const folder = decodeURIComponent(publicIdMatch[1]);

               // get the public Id of that file
               const publicId = `${folder}/${publicIdMatch[2]}`;

               // delete the file whose publicID matched
               const deleteFile = await deleteFromCloudinary(publicId)
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