

// starting the server
// Responsibility ---> it is responsible for starting the server. It imports the configuration of app.js and db.database.js. It also ensures that the database is connected before listening to the PORT

import dotenv from 'dotenv'
dotenv.config()
import { mongoDB } from './database/db.database.js'
import { app } from './app.js'


const startServer = async () => {
     try {
          await mongoDB();
          const PORT = process.env.PORT || 8000;
          app.listen(PORT, () => {
               console.log(`Server is running on port ${PORT}`);
          });
     } catch (err) {
          console.error('Failed to connect to the database', err);
          process.exit(1);
     }
};
startServer()

