

// Database configuration and connection
// Responsibility ---> This file is responsible for setting and connecting the Database , this includes the configuring,establishing a connection and handle potential connectivity errors that may occur while connecting to the DB

import mongoose from "mongoose"
import { ApiError } from "../utils/Error.util.js"
export const mongoDB = async () => {
     try {
          const connection = await mongoose.connect(`${process.env.mongoURL}`)
          if (!connection) throw new ApiError(500, "connection can not be established")

     }
     catch (err) {
          throw new ApiError(err, 500, "Connection to server is failed")
     }
}