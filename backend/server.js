
import mongoose from 'mongoose'
import express from 'express'
import './db.js'
import bodyParser from 'body-parser'
import { userRoute } from './routes/userRoute.js'
import candidateRoute from './routes/candidateRoute.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import queryRoute from './routes/queryRoute.js'
import userProfileRoute from "./routes/userProfileRoute.js"
import apiRoute from './routes/apiRoute.js'

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/user', userRoute)
app.use('/api', apiRoute)
app.use('/candidate', candidateRoute)
app.use('/query',queryRoute)
app.use('/user/profile', userProfileRoute)
const PORT = process.env.PORT

app.listen(PORT || 3000, () => {
     console.log(`App is listing to ${PORT}` )
})