
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { handleError } from "../utils/handleError.util.js";
import { response } from "../utils/response.util.js";
import mongoose from "mongoose";
import { Candidate } from "../models/candidate.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.util.js";

export const addCandidate = asyncHandler(async (req, res) => {

     const { uniqueId, voterId, firstName, town,lastName,candidateType, representative, promise, dob } = req.body
     if ([uniqueId, voterId, firstName,town, lastName,candidateType, representative, promise, dob].some((field) => field?.trim() === "")) {
          throw new handleError(400, 'Required fields are mandatory')
     }
     const existedCandidate = await Candidate.findOne({
          uniqueId,
          voterId
     })
     if (existedCandidate) throw new handleError("", 'Already Exists', 400)

     const avatarLocalPath = req.file?.path

     if (!avatarLocalPath) throw new handleError("", 'Avatar is Required', 400)

     const uploadAvatar = await uploadOnCloudinary(avatarLocalPath)
     if (!uploadAvatar) throw new handleError("", 'Avatar is required in this field', 400)

     const arrayOfPromise = promise.split(", ").map(item => item.trim().replace(/'/g, ""));

     const candidate = await Candidate.create({
          firstName,
          uniqueId,
          avatar: uploadAvatar.url,
          representative,
          lastName,
          voterId,
          town,
          candidateType:candidateType.charAt(0).toUpperCase() + candidateType.slice(1),
          dob,
          promise: arrayOfPromise
     })
     if (!candidate) throw new handleError("", 'problem in creating a candidate', 500)

     return res.status(200)
          .json(new response(
               200,
               "Candidate Added Successfully",
               candidate,
          ))
})

export const deleteCandidate = asyncHandler(async (req, res) => {
     try {
          // take Id from params
          const { id } = req.params

          // validate the Id
          if (!mongoose.Types.ObjectId.isValid(id)) {
               throw new handleError(400, "Invalid ID format")
          }

          // find the candidate with ID
          const candidateData = await Candidate.findById({ _id: id })
          if (!candidateData) throw new handleError(400, "Candidate with this ID does not exist")

          // find the avatar file path
          const avatarFile = candidateData.avatar

          // extract the public ID from the url
          const publicIdMatch = avatarFile.match(/\/upload\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/);
          if (!publicIdMatch || publicIdMatch.length < 3) {
               throw new Error('Invalid Cloudinary URL');
          }
          const folder = decodeURIComponent(publicIdMatch[1]);
          const publicId = `${folder}/${publicIdMatch[2]}`;

          // delete the file whose publicID matched
          const deleteFile = await deleteFromCloudinary(publicId)
          if (!deleteFile) throw new handleError(400, 'Not found the file')

          // delete the candidate as well
          await Candidate.findByIdAndDelete({ _id: id })

          return res
               .status(200)
               .json(new response(
                    200,
                    "Candidate Deleted Successfully",
                    {},
               ))
     } catch (error) {
          throw new handleError(500, error?.message || 'Problem in Deleting a file')
     }
})

export const updateCandidate = asyncHandler(async (req, res) => {

     try {
          // getting Id from params
          const { id } = req.params
          if (!id) throw new handleError("Id is required", 400)

          // validating ID
          if (!mongoose.Types.ObjectId.isValid(id)) {
               return res.status(400).json(new handleError(null, "Invalid ID format", 400));
          }

          // finding the candidate from that ID
          const candidateData = await Candidate.findById({ _id: id })
          if (!candidateData) throw new handleError(null, "Id is not valid", 400)

          // specific field to update
          const { firstName, lastName, partyName } = req.body

          // if the field is provided then will get updated
          if (firstName) candidateData.firstName = firstName
          if (lastName) candidateData.lastName = lastName
          if (partyName) candidateData.partyName = partyName

          const avatar = req.file?.path

          if (avatar) {
               // Add the new Avatar
               const avatarLocalPath = req.file?.path
               if (!avatarLocalPath) throw new handleError("", 'Avatar is Required', 400)

               // upload the avatar
               const uploadAvatar = await uploadOnCloudinary(avatarLocalPath)

               // find the already stored avatar file path
               const avatarFile = candidateData.avatar

               // delete the file from cloudinary
               const deleteFile = await deleteFromCloudinary(avatarFile)
               if (!deleteFile) throw new handleError(400, 'Not found the file')

               candidateData.avatar = uploadAvatar.url
          }
          await candidateData.save()
          return res.status(200)
               .json(new response(
                    200,
                    "Candidate Updated Successfully",
                    candidateData
               ))
     } catch (error) {
          return res.status(error.statusCode || 500).json({
               success: false,
               data: null,
               error: error.message,
               statusCode: error.statusCode || 500
          });
     }

})


export const getCandidate = asyncHandler(async (req, res) => {
     const candidateData = await Candidate.find()
     return res
          .status(200)
          .json(new response(
               200,
               "All candidated fetched Successfully", candidateData

          ))
})

export const getSpecificCandidate = asyncHandler(async (req, res) => {

     const { id } = req.params
     if (!id) throw new handleError(400, 'ID is required')

     if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new handleError(400, "Invalid ID format");
     }
     const candidateData = await Candidate.findById({ _id: id })
     return res
          .status(200)
          .json(new response(
               200,
               `Details of ${id}`,
               candidateData
          ))
})
