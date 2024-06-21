

// starting the server
// Responsibility ---> it is responsible for starting the server. It imports the configuration of app.js and db.database.js. It also ensures that the database is connected before listening to the PORT

import dotenv from 'dotenv'
dotenv.config(
     {
          path: './.env'
     })
import { mongoDB } from './database/db.database.js'
import { app } from './app.js'
import { handleError } from './utils/handleError.util.js'



mongoDB().then(() => {
     if (process.env.NODE_ENV !== 'production') {
          const PORT = process.env.PORT || 8000;
          app.listen(PORT, () => {
               console.log(`Server is running on port ${PORT}`);
          });
     }
}).catch((err) => {
     throw new handleError(err, 500, 'Error in running the server')
})


