
import { ApiResponse, ApiError } from "../utils/handlers";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { Candidate } from "../models/candidate.model";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.util";

export const addCandidate = async (req: Request, res: Response) => {

   const { ...rest } = req.body
   for (const i in rest) {
      const value = rest[i]
      if (typeof value === 'string' && value.trim().length === 0) {
         throw new ApiError(400, 'Required Fields are Mandatory')
      }
   }

   const existedCandidate = await Candidate.findOne({
      uniqueId: rest.uniqueId,
      voterId: rest.voterId
   })
   if (existedCandidate) throw new ApiError(400, 'Already Exists',)

   const avatarLocalPath = req.file?.path

   if (!avatarLocalPath) throw new ApiError(400, 'Avatar is Required')

   const uploadAvatar = await uploadOnCloudinary(avatarLocalPath)
   if (!uploadAvatar) throw new ApiError(400, 'Avatar is required in this field')

   const arrayOfPromise = rest.promise.split(", ").map((item: string) => item.trim().replace(/'/g, ""));

   const candidate = await Candidate.create({
      firstName: rest.firstName,
      uniqueId: rest.unqiueId,
      avatar: uploadAvatar.url,
      representative: rest.representative,
      lastName: rest.lastName,
      voterId: rest.voterId,
      town: rest.town,
      candidateType: rest.candidateType.charAt(0).toUpperCase() + rest.candidateType.slice(1),
      dob: rest.dob,
      promise: arrayOfPromise
   })
   if (!candidate) throw new ApiError(500, 'problem in creating a candidate')

   return ApiResponse(res, 200, 'Candidate Added Successfully', candidate)
}

export const deleteCandidate = async (req: Request, res: Response) => {
   try {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
         throw new ApiError(400, "Invalid ID format")
      }

      const candidateData = await Candidate.findById({ _id: id })
      if (!candidateData) throw new ApiError(400, "Candidate with this ID does not exist")

      const avatarFile = candidateData.avatar

      const publicIdMatch = avatarFile.match(/\/upload\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/);
      if (!publicIdMatch || publicIdMatch.length < 3) {
         throw new Error('Invalid Cloudinary URL');
      }
      const folder = decodeURIComponent(publicIdMatch[1]);
      const publicId = `${folder}/${publicIdMatch[2]}`;

      const deleteFile = await deleteFromCloudinary(publicId)
      if (!deleteFile) throw new ApiError(400, 'Not found the file')

      await Candidate.findByIdAndDelete({ _id: id })


      return ApiResponse(res, 200, 'Candidate Deleted Successfully')

   } catch (error: any) {
      throw new ApiError(error.statusCode || 500, error.message || ' Internal server error')
   }
}

export const updateCandidate = async (req: Request, res: Response) => {

   try {
      const { id } = req.params
      if (!id) throw new ApiError(400, "Id is required")

      if (!mongoose.Types.ObjectId.isValid(id)) {
         throw new ApiError(400, "Invalid ID format");
      }

      const candidateData = await Candidate.findById({ _id: id })
      if (!candidateData) throw new ApiError(400, "Id is not valid")

      const { firstName, lastName, representative } = req.body

      if (firstName) candidateData.firstName = firstName
      if (lastName) candidateData.lastName = lastName
      if (representative) candidateData.representative = representative

      const avatar = req.file?.path

      if (avatar) {
         const avatarLocalPath = req.file?.path
         if (!avatarLocalPath) throw new ApiError(400, 'Avatar is Required')

         const uploadAvatar = await uploadOnCloudinary(avatarLocalPath)

         const avatarFile = candidateData.avatar

         const deleteFile = await deleteFromCloudinary(avatarFile)
         if (!deleteFile) throw new ApiError(400, 'Not found the file')

         candidateData.avatar = uploadAvatar.url
      }
      await candidateData.save()

      return ApiResponse(res, 200, 'Candidate Updated Successfully', candidateData)

   } catch (error: any) {
      throw new ApiError(error.statusCode || 500, error.message || ' Internal server error')
   }

}


export const getCandidate = async (_req: Request, res: Response) => {
   const candidateData = await Candidate.find()
   return ApiResponse(res, 200, 'All candidated fetched Successfully', candidateData)
}

export const getSpecificCandidate = async (req: Request, res: Response) => {

   const { id } = req.params
   if (!id) throw new ApiError(400, 'ID is required')

   if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID format");
   }
   const candidateData = await Candidate.findById({ _id: id })
   return ApiResponse(res, 200, `Details of ${id}`, candidateData)

}

