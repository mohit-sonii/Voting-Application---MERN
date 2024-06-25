

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
     votesCount: {
          type: Number,
          default: 0
     },
     promise: {
          type: [String],
          required: true
     },
     partyName: {
          type: String,
          required: true
     }
})

export const Candidate = mongoose.model('Candidate', candidateSchema)