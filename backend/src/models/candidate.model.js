

import mongoose, { Schema } from 'mongoose'
import { User } from './user.model.js'

const candidateSchema = new Schema({
     firstName: {
          type: String,
          required: true
     },
     lastName: {
          type: String,
          required: true
     },
     avatar: {
          type: String,
          required: true
     },
     voterId: {
          type: String,
          required: true
     },
     uniqueId: {
          type: Number,
          required: true
     },
     votedUsers: [
          {
               type: Schema.Types.ObjectId,
               ref: User
          },
     ],
     town: {
          type: String,
          required: true
     },
     representative: {
          type: String,
          required: true
     },
     candidateType: {
          type: String,
          enum: ['New', 'Existing'],
          required: true
     },
     dob: {
          type: Date,
          required: true
     },
     votesCount: {
          type: Number,
          default: 0
     },
     promise: {
          type: [String],
          required: true
     },
})

export const Candidate = mongoose.model('Candidate', candidateSchema)