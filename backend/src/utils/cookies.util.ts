

import { CookieObject } from "./types.util"

const options: CookieObject = {
   httpOnly: true,
   secure: true
}

export function addCookie(token: string): { tokenName: string, token: string, options: CookieObject } {
   return {
      tokenName: "accessToken",
      token,
      options
   }
}

export function removeCookie(): { tokenName: string, options: CookieObject } {
   return {
      tokenName: "accessToken",
      options
   }
}