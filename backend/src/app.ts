

import cookieParser from 'cookie-parser'
import express from 'express'
import { Request, Response, NextFunction } from 'express';
import getDetails from "./routes/getDetails.routes"
import loginRegister from "./routes/loginRegister.routes"
import candidates from "./routes/candidates.routes"
import users from "./routes/users.routes"
import query from "./routes/query.routes"
import cors from "cors"
import env from './utils/env';

const app = express()
app.use(express.json())


const corsOptions = {
   origin: [env.localhostCORS, env.serverhostCORS],
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

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
   try {
      console.log(`Error, ${err.message}`)
      return res.status(500).json({ message: 'Internal Server Error!' })
   } catch (error: any) {
      next(error)
   }
});

export { app }