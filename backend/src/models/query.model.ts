
import mongoose, { Schema } from "mongoose";
import { QueryModel } from "../utils/types.util";


const querySchema:Schema = new Schema({
   username: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   state: {
      type: String,
      required: true
   },
   district: {
      type: String,
      required: true
   },
   queryType: {
      type: String,
      required: true
   },
   message: {
      type: String,
      required: true
   },
})

export const Query = mongoose.model<QueryModel>('Query', querySchema)