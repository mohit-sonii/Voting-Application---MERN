

// Express applicatoin setup
// Responsibility ---> This includes setting up the middleares,defininf routes and configuring any application level setting. the goal is to encapsulate the entire EXPRESS app in one file

import express from 'express'
const app = express()
import getAdminDetails from "./routes/getAdminData.routes.js"
app.use('/api/v1/admin',getAdminDetails)
export { app }