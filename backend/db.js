
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
     console.log(error + "Error in conncetion")
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




// import admin from './model/admin.js'
// db.on('connected', () => {
//      console.log('DataBase is connected Succefully')
// })
// db.on('error', (err) => {
//      console.log('Error in Connection', err)
// })
// db.on('disconnected', () => {
//      console.log('Server is disconnected');

// })
// const mongoURL = "mongodb://localhost:27017/votingApplication"
// const mongoURL = 'mongodb+srv://mohitsoni9731:mohitsoni123!!!@votingapplication.g3xc1sl.mongodb.net/?retryWrites=true&w=majority&appName=votingApplication'