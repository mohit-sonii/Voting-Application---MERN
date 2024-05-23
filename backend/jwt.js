import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateToken = (userData)=>{
     return jwt.sign(userData,process.env.SECRET,{expiresIn:'1h'})
}

export default generateToken