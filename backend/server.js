
import 'mongoose'
import express from 'express'
import './db.js'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import apiRoute from'./routes/apiRoute.js'

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/', userRoute)
app.use('/',apiRoute)


app.listen(5000, () => {
     console.log('App is listing to 5000')
})