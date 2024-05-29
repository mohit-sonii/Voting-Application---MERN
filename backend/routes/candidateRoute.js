
import candidate from "../model/candidate.js"
import express from 'express'
// imported the function for validating an admin
import { whoTheUser } from './userRoute.js';
const router = express.Router()

// GET request to retrieve the candidates
router.get('/', async (req, res) => {
     try {
          // show all the data
          const showCandidate = await candidate.find()
          res.status(200).json(showCandidate)
     } catch (err) {
          res.status(400).json({ message: 'Failed to get the data for candidate' })
          console.log(err.message + 'error in candiate route')
     }
})
// POST for /admin to add candidates in DB
router.post('/admin', async (req, res) => {
     try {
          // check if admin is on or not
          if (whoTheUser() === 'admin') {
               // if yes, then do extract data form the body
               const data = req.body
               // add that candidate according to the schema
               const newCandidate = new candidate(data)
               // save the candidate in the DB
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
// DELETE request that will delete the candidate
router.delete('/admin/deleteCandidate/:id', async (req, res) => {
     try {
          // check for the admin 
          if (whoTheUser() !== 'admin') {
               // if not, then return 
               return res.status(401).json({ message: 'You are unauthorized to access this route' });
          }
          // if yes, then extract id form the params
          const candidateID = req.params.id
          // find the candidate using its ID
          const candidateData = await candidate.findById(candidateID)
          // check if the candidate exists
          if (!candidateData) {
               // if not, then return 
               return res.status(204).json({ message: 'candidate not found' })
          }
          // if yes, then delete it 
          const response = await candidate.findByIdAndDelete(candidateID)
          return res.status(200).json({ message: 'Item deleted' })


     } catch (err) {
          console.log(err.message + "Error in admin candidate Deletion")
          res.status(400).json({ message: 'failed to delete candidates' })
     }
})
// PUT request to udpate the existing candidate
router.put('/admin/updateCandidate/:id', async (req, res) => {
// check for the admin
     if (whoTheUser() !== 'admin') {
          return res.status(401).json({ message: 'You are unauthorized to access this route' });
     }
     try {
          // take the id form the params
          const { id } = req.params
          // find the candidate form its ID
          const candidateData = await candidate.findById(id)
          // if candidate does not exists then return 
          if (!candidateData) {
               return res.status(204).json({ message: 'candidate not found' })
          }
          // if exists, then accepts these possible JSON data 
          const { firstName, lastName, partyName, uniqueId } = req.body
          // update the exisiting data
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