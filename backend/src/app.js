

// Express applicatoin setup
// Responsibility ---> This includes setting up the middleares,defininf routes and configuring any application level setting. the goal is to encapsulate the entire EXPRESS app in one file

import express from 'express'

const app = express()
app.use(express.json())

import cookieParser from 'cookie-parser'
app.use(cookieParser())

import getDetails from "./routes/getDetails.routes.js"
import loginRegister from "./routes/loginRegister.routes.js"
import candidates from "./routes/candidates.routes.js"

// GET details routes
app.use('/api/v1/admin',getDetails)
app.use('/api/v1/api/districts-and-states',getDetails)

//Login routes
app.use('/api/v1/auth',loginRegister)

//candidatelist routes
app.use('/api/v1/candidates/candidate-list',getDetails)
app.use('/api/v1/candidates/candidate-list',candidates)

export { app }