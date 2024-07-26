
import multer from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
   destination: function (_req: Request, _file, cb) {
      cb(null, "./public")
   },
   filename: function (_req: Request, file, cb) {
      cb(null, file.originalname)
   }
})

export const upload = multer({ storage })