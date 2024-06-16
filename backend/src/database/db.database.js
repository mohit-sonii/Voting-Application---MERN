

// Database configuration and connection
// Responsibility ---> This file is responsible for setting and connecting the Database , this includes the configuring,establishing a connection and handle potential connectivity errors that may occur while connecting to the DB

// createAdmin() is a function that will run only once or just after the configuration of Database, we do not need to create a new admin after each connection so we  will use this only once and then do commment out

import mongoose from "mongoose"
import { handleError } from "../utils/handleError.util.js"
// import { createAdmin } from "../utils/admin.util.js"
export const mongoDB = async () => {
     try {
          const connection = await mongoose.connect(`${process.env.mongoURL}`)
          if (!connection) throw new handleError(500, "connection can not be established")

          // await createAdmin()
     }
     catch (err) {
          throw new handleError(err, 500, "Connection to server is failed")
     }
}