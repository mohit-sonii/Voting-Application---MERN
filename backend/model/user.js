
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          required: true,
          trim: true

     },
     lastName: {
          type: String,
          required: true,
          trim: true

     },
     uniqueIdNumber: {
          type: Number,
          required: true,
          unique: true
     },
     dob: {
          type: Date,
          required: true
     },
     voterCard: {
          type: String,
          unique: true,
          required:true
     },
     password: {
          type: String,
          required: true
     }
})

userSchema.pre('save', async function (next) {
     const user = this
     if (!user.isModified('password')) return next()

     try {
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(user.password, salt)
          user.password = hashPassword
          next()
     } catch (error) {
          console.log('Error generating the password', error)
          next(error)
     }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
     try {
          const isMatch = await bcrypt.compare(candidatePassword, this.password)
          return isMatch
     } catch (error) {
          console.log('Comparing an wrror causes preoblem', error)
     }
}


const user = mongoose.model('user', userSchema)
export default user