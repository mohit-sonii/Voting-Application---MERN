
import mongoose from 'mongoose'
import env from 'dotenv'
// import createAdmin  from './model/admin.js'
env.config()

mongoose.connect(process.env.mongoURL)
const db = mongoose.connection
db.on('connected', () => {
     console.log('Db is connected Successfully')
     // init()
})
db.on('error', (error) => {
     console.log(error.message + "Error in conncetion")
})
// async function init() {
//      try {
//           await createAdmin()
//      }
//      catch (err) {
//           console.log('Problem in Adming section', err.message)
//      }
// }

export default db



