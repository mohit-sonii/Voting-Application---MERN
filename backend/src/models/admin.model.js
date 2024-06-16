
import mongoose, { Schema } from 'mongoose'
import { verifyPassword, hashPassword } from '../utils/password.util.js'
import {  handleError } from '../utils/handleError.util.js'

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

// run this function before saving
adminSchema.pre('save', async function (next) {
     // check is the password modified, if no then do nothing, 
     if (!this.isModified('password')) return next()
     try {
          //if yes, then do hash the password
          this.password = await hashPassword(this.password)
          // move on to next middleware
          next()
     } catch (err) {
          //handle error gradually
          next(err)
     }

})

//compare the password
adminSchema.methods.comparePassword = async function (password) {
     try {
          return await verifyPassword(password, this.password)
     } catch (err) {
          throw new handleError(400, 'Error in comparing the admin password')
     }
}

export const Admin = mongoose.model('Admin', adminSchema)