
import mongoose from 'mongoose'

const mongoURL = "mongodb://localhost:27017/votingApplication"
// const mongoURL = 'mongodb+srv://mohitsoni9731:mohitsoni123!!!@votingapplication.g3xc1sl.mongodb.net/?retryWrites=true&w=majority&appName=votingApplication'

 mongoose.connect(mongoURL)
const db = mongoose.connection


db.on('connected', () => {
     console.log('DataBase is connected Succefully')
})
db.on('error', (err) => {
     console.log('Error in Connection', err)
})
db.on('disconnected', () => {
     console.log('Server is disconnected');

})
export default db