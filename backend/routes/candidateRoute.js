
import candidate from "../model/candidate.js"
import express from 'express'
import { whoTheUser } from './userRoute.js';
const router = express.Router()


router.get('/', async (req, res) => {
     try {
          const showCandidate = await candidate.find()
          res.status(200).json(showCandidate)
     } catch (err) {
          res.status(400).json({ message: 'Failed to get the data for candidate' })
          console.log(err.message + 'error in candiate route')
     }
})
router.post('/admin', async (req, res) => {
     try {
          if (whoTheUser() === 'admin') {
               const data = req.body
               const newCandidate = new candidate(data)
               const response = await newCandidate.save()
               res.status(200).json({ response: response })
          } else {
               return res.status(401).json({ message: 'You are unauthorized to access this route' })
          }

     } catch (err) {
          console.log(err.message + "Error in admin candidate")
          res.status(400).json({ message: 'failed to post candidates' })
     }
})
router.delete('/admin/deleteCandidate/:id', async (req, res) => {
     try {
          if (whoTheUser() !== 'admin') {
               return res.status(401).json({ message: 'You are unauthorized to access this route' });
          }
          const candidateID = req.params.id
          const candidateData = await candidate.findById(candidateID)
          if (!candidateData) {
               return res.status(204).json({ message: 'candidate not found' })
          }
          const response = await candidate.findByIdAndDelete(candidateID)
          return res.status(200).json({ message: 'Item deleted' })


     } catch (err) {
          console.log(err.message + "Error in admin candidate Deletion")
          res.status(400).json({ message: 'failed to delete candidates' })
     }
})
router.put('/admin/updateCandidate/:id', async (req, res) => {

     if (whoTheUser() !== 'admin') {
          return res.status(401).json({ message: 'You are unauthorized to access this route' });
     }
     try {
          const { id } = req.params
          const candidateData = await candidate.findById(id)
          if (!candidateData) {
               return res.status(204).json({ message: 'candidate not found' })
          }
          const { firstName, lastName, partyName, uniqueIdNumber } = req.body
          const updateData = await candidate.findByIdAndUpdate(id, req.body, {
               new: true,
               validators: true
          });
          res.status(200).json(updateData)
     } catch (err) {
          res.status(400).json({ message: "Error in updating" })
          console.log(err.message + " errror in upddating")
     }
})

export default router