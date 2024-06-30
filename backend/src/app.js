

// Express applicatoin setup
// Responsibility ---> This includes setting up the middleares,defininf routes and configuring any application level setting. the goal is to encapsulate the entire EXPRESS app in one file

import cookieParser from 'cookie-parser'
import express from 'express'
import getDetails from "./routes/getDetails.routes.js"
import loginRegister from "./routes/loginRegister.routes.js"
import candidates from "./routes/candidates.routes.js"
import users from "./routes/users.routes.js"
import query from "./routes/query.routes.js"
import cors from "cors"

const app = express()
app.use(express.json())


const corsOptions = {
     origin: ['http://localhost:5173', 'https://voting-application-mern.netlify.app'],
     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
     allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions))

app.use(cookieParser())


// GET details routes
app.use('/api/v1/admin', getDetails)
app.use('/api/v1/api/districts-and-states', getDetails)

//Login routes
app.use('/api/v1/auth', loginRegister)

//candidatelist routes
app.use('/api/v1/candidates/candidate-list', getDetails)
app.use('/api/v1/candidates/candidate-list', candidates)

// user routes
app.use('/:id/api/v1/user/profile', users)


//query route
app.use('/', query)

app.use((err, req, res, next) => {
     const statusCode = err.statusCode || 500;
     const message = err.message || 'Internal Server Error';
     res.status(statusCode).json({
          status: 'error',
          statusCode,
          message
     });
});

export { app }