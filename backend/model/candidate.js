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
     uniqueId: {
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
     // votes is an array to those people who vote the candidate
     votes: [
          {
               // an object containing two objects
               user: {
                    // It is used to define a property in a schema that will hold MongoDB ObjectIds. This is commonly used for creating references between different documents in MongoDB collections
                    type: mongoose.Schema.Types.ObjectId,
                    // reference to the user 
                    ref: 'user',
                    require: true
               },
               votedAt: {
                    // will add the date
                    type: Date,
                    default: Date.now
               }
          }
     ]
})

const candidate = mongoose.model('candidate', candidateSchema)
export default candidate