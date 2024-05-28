
import express from 'express'
import query from '../model/query.js'
import { whoTheUser } from './userRoute.js'
const router = express.Router()

router.post('/', async (req, res) => {
     try {
          const data = req.body
          const newQuery = new query(data)
          const response = await newQuery.save()
          res.status(200).json({ response: response })
     } catch (err) {
          console.log(err.message + "Error in query Route")
          res.status(500).json({ message: err.message })
     }
})

router.get('/', async (req, res) => {
     try {
          if (whoTheUser() === 'admin') {
               const data = await query.find()
               res.status(200).json({ message: 'Her eyou go' })
          } else {
               res.status(204).json({ message: 'not authoriaxed' })
          }
     } catch (error) {

     }
})
export default router