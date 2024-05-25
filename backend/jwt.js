import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// it is used to configure the dotenv filed
dotenv.config()

// this will take the argument or user that will come when a user signup or login
const generateToken = (userData)=>{
     // this is genreate a signature and return the token that will expire in 10 days
     return jwt.sign(userData,process.env.SECRET,{expiresIn:'10d'})
}

export default generateToken