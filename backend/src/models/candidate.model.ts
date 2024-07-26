

import mongoose, { Schema } from 'mongoose'
import { CandidateModel } from '../utils/types.util'


const candidateSchema: Schema = new Schema({
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
   votedUsers: {
      type: [
         {
            type: mongoose.Types.ObjectId,
            ref: 'User'
         }
      ],
      default: []
   },
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

export const Candidate = mongoose.model<CandidateModel>('Candidate', candidateSchema)