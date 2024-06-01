import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// it is used to configure the dotenv filed
dotenv.config()

const verifyToken = (req,res,next)=>{
     const token  = req.headers['authorization']
     if(!token){
          return res.status(403).json({message:'No token provided'})
     }
     jwt.verify(token,process.env.SECRET,(err,decode)=>{
          if(err){
               return res.status(500).json({message:'Failed to authenticate token'})
          }
          req.userId=decode.id
          next()
     })
}

// this will take the argument or user that will come when a user signup or login
const generateToken = (userData)=>{
     // this is genreate a signature and return the token that will expire in 10 days
     return jwt.sign(userData,process.env.SECRET,{expiresIn:'1d'})
}

export default {generateToken,verifyToken}