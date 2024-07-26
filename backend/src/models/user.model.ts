
import mongoose, { Schema } from "mongoose";
import { UserModel } from "../utils/types.util";


const userSchema: Schema = new Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   uniqueId: {
      type: Number,
      required: true
   },
   voterId: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      default: "user"
   },
   avatar: {
      type: String,
   },
   isVoted: {
      type: Boolean,
      default: false
   }
})


export const User = mongoose.model<UserModel>('User', userSchema)
