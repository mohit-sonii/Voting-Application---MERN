
import { Response } from "express"
import { CookieObject, ResponseType } from "./types.util"

class ApiError extends Error {
   statusCode: number
   message: string
   constructor(statusCode: number, message: string, stack: string = '') {
      super(message)
      this.statusCode = statusCode
      this.message = message
      this.stack = stack
   }
}

const ApiResponse = (
   res: Response,
   code: number,
   message: string,
   data: any = null,
   cookies: { tokenName: string, token: string, options: CookieObject } | null = null,
   removeCookies: { tokenName: string, options: CookieObject } | null = null,
   errors: any = null
) => {
   const success: boolean = code < 400 
   const response: ResponseType = { code, success, message, data, cookies, removeCookies, errors }

   if (data) response.data = data;
   if (errors) response.errors = errors;
   if (cookies) {
      const { tokenName, token, options } = cookies;
      return res
         .status(code)
         .cookie(tokenName, token, options)
         .json(response);
   }

   if (removeCookies) {
      const { tokenName, options } = removeCookies
      return res
         .status(code)
         .clearCookie(tokenName, options)
         .json(response);
   }
   else {
      return res
         .status(code)
         .json(response);
   }
}


export { ApiError, ApiResponse }