
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { handleError } from "../utils/handleError.util.js";
import { apiResponse } from "../utils/response.util.js";
import { Candidate } from "../models/candidate.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

export const addCandidate = asyncHandler(async (req, res) => {

     const { uniqueId, voterId, firstName, lastName, partyName } = req.body
     if ([uniqueId, voterId, firstName, lastName, partyName].some((field) => field?.trim() === "")) {
          throw new handleError(400, 'Required fields are mandatory')
     }

     const existedCandidate = await Candidate.findOne({
          uniqueId,
          voterId
     })
     if (existedCandidate) throw new handleError(400, 'Already Exists')

     const avatarLocalPath = req.file?.path //beacuse we have single file
     console.log(avatarLocalPath)
     if (!avatarLocalPath) throw new handleError(400, 'Avatar is Required')

     const uploadAvatar = await uploadOnCloudinary(avatarLocalPath)
     if (!uploadAvatar) throw new handleError(400, 'Avatar is required in this field')

     const candidate = await Candidate.create({
          firstName,
          uniqueId,
          avatar: uploadAvatar.url,
          partyName,
          lastName,
          voterId,
     })
     if (!candidate) throw new handleError(500, 'problem in creating a candidate')

     return res.status(200)
          .json(new apiResponse(
               200,
               candidate,
               "Candidate Added Successfully"
          ))
})

export const deleteCandidate = asyncHandler(async (req, res) => {

})

export const updateCandidate = asyncHandler(async (req, res) => {

})
export const getCandidate = asyncHandler(async (req, res) => {
     const candidateData = await Candidate.find()
     return res
          .status(200)
          .json(new apiResponse(
               200,
               candidateData
          ))
})
