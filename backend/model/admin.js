
import mongoose from 'mongoose'
import env from 'dotenv'
import bcrypt from 'bcrypt'
env.config()

const adminSchema = new mongoose.Schema({
     uniqueIdNumber: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          required: true,
          type: String
     }
})


async function hashAdminPass(password) {
     // generate a salt 
     const salt = await bcrypt.genSalt(10)
     // hash the password
     return await bcrypt.hash(password, salt)
}


adminSchema.methods.comparePassword = async function (password) {
     try {
          return await bcrypt.compare(password, this.password)

     } catch (err) {
          console.log('Error in matching password' + err.message)
          return false
     }
}

// create a mongoose model name admin
// it was in the createAdmin function but beacuse the admin is added in the databse so we don't need this function now
const admin = mongoose.model('admin', adminSchema);
export default admin


// createAdmin function is no needed now

//function to create a predefined admin
async function createAdmin() {
     // get the uniqueIdNumber from the ENV file
     const uniqueIdNumber = process.env.adminUniqueId;
     // get the password from the ENV file
     let password = process.env.adminPass;

     // Hash the password
     const hashedPassword = await hashAdminPass(password);
     // Check if admin already exists
     const existingAdmin = await Admin.findOne({ uniqueIdNumber });
     // if not then create a new user with the Id and passowrd and then save it
     if (!existingAdmin) {
          const admin = new Admin({ uniqueIdNumber, password: hashedPassword });
          await admin.save();
          console.log('Admin user created successfully.');
     }
     // else {
     //   console.log('Admin user already exists.');
     // }
}

// we do not need to export this function now
// export default createAdmin

