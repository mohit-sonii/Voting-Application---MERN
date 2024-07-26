
import { Response } from "express"
import mongoose, { Document } from "mongoose"

export interface CookieObject {
   httpOnly: boolean,
   secure: boolean
}


export type ResponseType = {
   code: number,
   success: boolean
   message: string,
   data?: any,
   cookies?: { tokenName: string, token: string, options: CookieObject } | null,
   removeCookies?: { tokenName: string, options: CookieObject } | null,
   errors?: any
}


export interface UserModel extends Document {
   _id: mongoose.Types.ObjectId,
   firstName: string,
   lastName: string,
   uniqueId: number,
   voterId: string,
   password: string,
   role?: string,
   avatar?: string,
   isVoted?: boolean,
}


export interface JWT {
   _id: string,
   uniqueId: string,
   role: string,
   isVoted: boolean
}

export interface Updates {
   avatar?: string,
   firstName?: string,
   lastName?: string,
   password?: string
}

export interface AdminModel extends Document {
   _id: mongoose.Types.ObjectId,
   uniqueId: number,
   password: string,
   role?: string
   isVoted?:boolean
}


export interface CandidateModel extends Document {
   _id: mongoose.Types.ObjectId
   firstName: string,
   lastName: string,
   avatar: string,
   voterId: string,
   uniqueId: number,
   votedUsers?: mongoose.Types.ObjectId[],
   town: string,
   representative: string,
   candidateType: string,
   dob: Date,
   votesCount?: number,
   promise: string[]
}


export interface QueryModel extends Document {
   username: string,
   phone: string,
   email: string,
   state: string,
   district: string,
   queryType: string,
   message: string
}