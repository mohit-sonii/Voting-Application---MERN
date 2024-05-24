import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// it is used to configure the dotenv filed
dotenv.config()

// this will take the argument or user that will come when a user signup or login
const generateToken = (userData)=>{
     // this is genreate a signature and return the token tha twill expire in 1 hour
     return jwt.sign(userData,process.env.SECRET,{expiresIn:'1h'})
}

export default generateToken