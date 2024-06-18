import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
cloudinary.config({
     // cloud_name: process.env.cloudinaryCloudName,
     cloud_name: "dslv7ionv",
     // api_key: process.env.cloudinaryApiKey,
     api_key: "816114611513743",
     // api_secret: process.env.cloudinaryApiSecret
     api_secret: "3dy0ak2-IW_gSE3BUASm6f4BtBM"
})

// console.log(`${process.env.cloudinaryCloudName} api is  ${process.env.cloudinaryApiKey} secret si ${process.env.cloudinaryApiSecret}`)
export const uploadOnCloudinary = async (localFilePath) => {
     try {
          const response = await cloudinary.uploader.upload(localFilePath, {
               resource_type: "auto",
               folder: "voting application"
          })
          fs.unlinkSync(localFilePath)
          return response
     } catch (err) {
          return null
     }
}