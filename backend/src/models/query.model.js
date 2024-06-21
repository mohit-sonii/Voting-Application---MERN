
import mongoose,{Schema} from "mongoose";

const querySchema = new Schema({
     username:{
          type:String,
          required:true
     },
     phone:{
          type:Number,
          required:true
     },
     email:{
          type:String,
          required:true
     },
     state:{
          type:String,
          required:true
     },
     district:{
          type:String,
          required:true
     },
     queryType:{
          type:String,
          required:true
     },
     message:{
          type:String,
          required:true
     },
})

export const Query = mongoose.model('Query',querySchema)