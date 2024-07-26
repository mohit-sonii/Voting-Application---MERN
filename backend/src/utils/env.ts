import dotenv from "dotenv";
import { cleanEnv, str, port } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
   mongoURL: str(),

   adminUniqueId: str(),
   adminPassword: str(),

   accessTokenSecret: str(),
   accessTokenExpiry: str(),

   refreshTokenSecret: str(),
   refreshTokenExpiry: str(),

   cloudinaryCloudName: str(),
   cloudinaryApiKey: str(),
   cloudinaryApiSecret: str(),
   
   localhostCORS: str(),
   serverhostCORS: str(),

   PORT: port(),

});

export default env;
