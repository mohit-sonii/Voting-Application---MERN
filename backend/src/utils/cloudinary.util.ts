import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { UploadApiResponse } from 'cloudinary'
import env from './env'

cloudinary.config({
   cloud_name: env.cloudinaryCloudName,
   api_key: env.cloudinaryApiKey,
   api_secret: env.cloudinaryApiSecret
})

export const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse> => {
   try {

      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto",
         folder: "voting application"
      })

      fs.unlinkSync(localFilePath)
      return response
   } catch (err: any) {
      fs.unlinkSync(localFilePath)
      return err
   }
}
export const deleteFromCloudinary = async (incomingFile: string) => {
   const publicIdMatch = incomingFile.match(/\/upload\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/);

   if (!publicIdMatch || publicIdMatch.length < 3) {
      throw new Error('Invalid Cloudinary URL');
   }

   const folder = decodeURIComponent(publicIdMatch[1]);

   const publicId = `${folder}/${publicIdMatch[2]}`;
   return await cloudinary.uploader.destroy(publicId)
}