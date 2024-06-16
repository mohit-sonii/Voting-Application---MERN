
import { Admin } from "../models/admin.model.js"
import { hashPassword } from "./password.util.js"
export const createAdmin = async () => {
     const uniqueId = process.env.adminUniqueId
     const password = process.env.adminPassword

     try {
          const alreadyExist = await Admin.findOne({ uniqueId })
          if (!alreadyExist) {
               const hashPassForAdmin = await hashPassword(password)
               const newAdmin = new Admin({ uniqueId: uniqueId, password: hashPassForAdmin })
               await newAdmin.save()
               console.log('Admin created successfully', newAdmin, hashPassForAdmin)
          }
          else {
               console.log('Admin is already exists')
          }

     } catch (err) {
          console.log(err)
     }
}