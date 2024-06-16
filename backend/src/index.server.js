

// starting the server
// Responsibility ---> it is responsible for starting the server. It imports the configuration of app.js and db.database.js. It also ensures that the database is connected before listening to the PORT

import dotenv from 'dotenv'
dotenv.config(
     {
          path: './.env'
     })
import { mongoDB } from './database/db.database.js'
import { app } from './app.js'
import { ApiError } from './utils/Error.util.js'
mongoDB().then(() => {
     app.listen(process.env.PORT || 8000, () => {
          console.log(`App is running on ${process.env.PORT}`)
     })
}).catch((err) => {
     throw new ApiError(err, 500, 'Error in running the server')
})

