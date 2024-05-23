
import 'mongoose'
import express from 'express'
import './db.js'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute.js'
import cors from 'cors'


const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/', userRoute)


app.listen(3000, () => {
     console.log('App is listing to 3000')
})