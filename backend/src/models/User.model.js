
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
     firstName:{
          type:String,
          required:true
     },
     lastName:{
          type:String,
          required:true
     },
     uniqueId:{
          type:Number,
          required:true
     },
     voterId:{
          type:String,
          required:true
     },  
     password:{
          type:String,
          required:true
     },
     role:{
          type:String,
          default:"user"
     },
     avatar:{
          type:String,
     },
     isVoted:{
          type:Boolean,
          default:false
     },
     refreshToken:{
          type:String
     }

})


export const User = mongoose.model('User', userSchema)