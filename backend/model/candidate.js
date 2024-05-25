import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
     firstName: {
          type: String,
          require: true,
          trim: true
     },
     lastName: {
          type: String,
          require: true,
          trim: true
     },
     partyName: {
          type: String,
          require: true
     },
     uniqueIdNumber: {
          unique: true,
          type: Number,
          require: true,
     },
     canVote: {
          type: Boolean,
          default: false
     },
     voteCount: {
          type: Number,
          default: 0
     },
     votes: [
          {
               user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                    require: true
               },
               votedAt: {
                    type: Date,
                    default: Date.now
               }
          }
     ]
})

const candidate = mongoose.model('candidate', candidateSchema)
export default candidate