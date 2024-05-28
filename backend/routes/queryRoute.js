
import express from 'express'
import query from '../model/query.js'
import { whoTheUser } from './userRoute.js'
const router = express.Router()

router.post('/', async (req, res) => {
     try {
          if(whoTheUser()==='admin'){
               const data = req.body
               const newQuery = new query(data)
               const response = await newQuery.save()
               res.status(200).json({response:response})
          }
          else{
               return res.status(401).json({ message: 'You are unauthorized to access this route' })
          }
     } catch (err) {
          console.log(err.message + "Error in query Route")
          res.status(500).json({ message: err.message })
     }
})

export default router