
import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
     username: {
          required: true,
          type: String
     },
     phone: {
          required: true,
          type: Number
     },
     state: {
          required: true,
          type: String
     },
     district: {
          type: String,
          required: true
     }
     ,
     email: {
          type: String
     },
     query: {
          required: true,
          type: String
     },
     message: {
          required: true,
          type: String
     }

})
const query = mongoose.model('query', querySchema)
export default query