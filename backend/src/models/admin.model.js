
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new Schema({
     uniqueId: {
          type: Number,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     role: {
          type: String,
          default: 'admin'
     }
})

//compare password
adminSchema.methods.isPasswordCorrect = async function (requestPassword) {
     return await bcrypt.compare(requestPassword, this.password)
}


export const Admin = mongoose.model('Admin', adminSchema)