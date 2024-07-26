

import dotenv from 'dotenv'
dotenv.config({
   path: './.env'
})
import { mongoDB } from './database/db.database'
import { app } from './app'
import { ApiError } from './utils/handlers';


const startServer = async () => {
   try {
      await mongoDB();
      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   } catch (err:any) {
      // throw new ApiError(500,'Server connection is failed. Try again after some time')
      process.exit(1);
   }
};
startServer()

