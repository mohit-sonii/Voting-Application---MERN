import jwt from 'jsonwebtoken'
import env from './env'
import { UserModel } from './types.util'
import { AdminModel } from './types.util'

export const generateAccessToken = (user: UserModel | AdminModel) => {
   return jwt.sign(
      {
         _id: user._id,
         uniqueId: user.uniqueId,
         role: user.role,
         isVoted: user.isVoted,
      },
      env.accessTokenSecret,
      {
         expiresIn: env.accessTokenExpiry
      }
   )
}