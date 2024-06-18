

import mongoose, { Schema } from 'mongoose'
import { User } from './User.model.js'

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
     votesCount: [
          {
               type: Schema.Types.ObjectId,
               ref: User
          }
     ],
     partyName: {
          type: String,
          required: true
     }
})

export const Candidate = mongoose.model('Candidate', candidateSchema)