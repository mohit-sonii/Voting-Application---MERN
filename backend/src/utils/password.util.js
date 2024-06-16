
import bcrypt from 'bcrypt'
import { handleError } from './handleError.util.js'

const saltRound = 10

export const hashPassword = async (password) => {
     try {
          const salt = await bcrypt.genSalt(saltRound)
          const hashedPassword = await bcrypt.hash(password, salt)
          return hashedPassword
     } catch (error) {
          throw new handleError(500, "Error in genrating the hashed password")
     }
}

export const verifyPassword = async(password,hashedpassword)=>{
     try {
          const  isMatch = await bcrypt.compare(password,hashedpassword)
          return isMatch
     } catch (error) {
          throw new handleError(500, "Error in veriifying the password")

     }
}