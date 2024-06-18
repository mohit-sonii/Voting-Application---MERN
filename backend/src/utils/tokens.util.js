import jwt from 'jsonwebtoken'

export const generateAccessToken = (user) =>{
     return jwt.sign(
          {
               _id:user._id,
               uniqueId:user.uniqueId
          },
          process.env.accessTokenSecret,
          {
               expiresIn:process.env.accessTokenExpiry
          }
     )
}

export const generateRefreshToken = (user)=>{
     return jwt.sign(
          {
               _id:user._id
          },
          process.env.refreshTokenSecret,
          {
               expiresIn:process.env.refreshTokenExpiry
          }
     )
}