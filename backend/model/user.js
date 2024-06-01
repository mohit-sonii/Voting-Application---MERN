
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
     firstname: {
          type: String,
          required: true,
          trim: true

     },
     lastname: {
          type: String,
          required: true,
          trim: true

     },
     uniqueId: {
          type: String,
          required: true,
          unique: true
     },
     voter: {
          type: String,
          unique: true,
          required:true
     },
     password: {
          type: String,
          required: true
     },
     isVoted:{
          type:Boolean,
          default:false
     },
     token:{
          type:String
     }
})

// before saving this function will call 
userSchema.pre('save', async function (next) {
     // this will take the user that is curently accessing the application
     const user = this
     // if the user hasnot modified the password then move one
     if (!user.isModified('password')) return next()

     // if the user has modified 
     try {
          // generate a salt using bcrypt 
          const salt = await bcrypt.genSalt(10)
          // hash the password  with the salt
          const hashPassword = await bcrypt.hash(user.password, salt)
          // store the hashed password in the user.password field
          user.password = hashPassword
          // move on to next middleware (if any)
          next()
     } catch (error) {
          console.log('Error generating the password', error)
          next(error)
     }
})

// this is made to comapre the password. 
/* Once the password is hashed then it will not chnage to the original data while comparing infact when a user writes passsword it will hash that and then will check whether that hashed passowrd is equal to the stored hased password. if yes then reutrn true orther fasle */

userSchema.methods.comparePassword = async function (candidatePassword) {

     try {
          // compare the newly ggenerated hash with the hash already stored for that user
          const isMatch = await bcrypt.compare(candidatePassword, this.password)
          return isMatch
     } catch (error) {
          console.log('Comparing an wrror causes preoblem', error.message)
     }
}


const user = mongoose.model('user', userSchema)
export default user