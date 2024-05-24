
import express from 'express'
import user from '../model/user.js'
import generateToken from '../jwt.js'

const router = express.Router()
router.post('/auth/signup', async (req, res) => {
     try {
          // accept data form the body section
          const data = req.body;
          // create a new user with the following data
          const newUser = new user(data)
          // save the user 
          const response = await newUser.save()
          // extract the Id of that user
          const payload = {
               id: response.id
          }
          // and give them a token 
          const token = generateToken(payload)
          res.status(200).json({ response: response, token: token })
     } catch (error) {
          console.log('Error in adding a new user', error.message)
          res.status(400).json({ error: error.message })
     }
})

router.get('/', async (req, res) => {
     try {
          // to see the data 
          const showData = await user.find();
          res.status(200).json(showData)

     } catch (err) {
          res.status(400).json({ message: "Failed to get the Data from DBMS" })
          console.log(err + " Error in getting data from server")
     }
})

router.post('/auth/login', async (req, res) => {
     try {
          // to login we need uniqueId number and password. we extract this from boyd
          const { uniqueIdNumber, password } = req.body

          // const adminCollection = db.collection('admin')
          // const adminData =  adminCollection.find({uniqueIdNumber:uniqueIdNumber})
          // const adminPassMatch = await adminData


          // check whether we have that Id in databse or not
          const userData = await user.findOne({ uniqueIdNumber: uniqueIdNumber })
          // check if the password matched or nor
          const passMatch = await userData.comparePassword(password)
          // if any of the filed is wrong then give the errors
          if (!userData || !passMatch) return res.status(204).json({ response: 'Either unique Number or password is incorrect' })
          // if not the extract the id of the user
          const payload = {
               id: userData.id
          }
          //and assign them a token 
          const token = generateToken(payload)
          res.status(200).json((token))
     } catch (error) {
          console.log('Error in login request', error)
          res.status(400).json({ error: error })
     }
})
router.post('/auth/forget-password', async (req, res) => {
     // extract two field from body 
     const { uniqueIdNumber, voterCard } = req.body
     //if required fields are not mentioned  
     if(!uniqueIdNumber || !voterCard) return res.status(400).json({error:'Required Fields are Missing'})

     try {
          // find a user with that unique Id the user has
          const userId = await user.findOne({ uniqueIdNumber: uniqueIdNumber })
          // find the user with that voter card as well
          const userVoter = await user.findOne({ voterCard: voterCard })
          // if any of them is incorrect then return the error
          if (!userId || !userVoter) return res.status(204).json({ error: 'User does not exist.' })
          //extract the id from the userId and redirect user to another route
          return res.redirect(`/auth/forget-password/create-new-password/${userId._id}`)

     } catch (err) {
          console.log('error in forgetting the passworrd')
          res.send(400).json({ error: err })
     }
})

router.patch('/auth/forget-password/create-new-password/:id',async(req,res)=>{
     // extract Id from that URL
     const {id}=req.params
     // extract password field as this is the only this which we want to update
     const {password}=req.body;
     try {
          // we will find the data using the Id and will update the password
          const updateData = await user.findByIdAndUpdate(id, {password}, {
               new: true,
          });
          // this is store the updated data in the user 
          const dataUpdate = user(updateData)
          // this will save the data with hashing
          await dataUpdate.save()
          // it will reutrn the udpated data
          res.status(200).json(dataUpdate)
     } catch (err) {
          res.status(400).json({ message: "Failed to update user" })
          console.log(err + " Failed in update user")
     }
})



export default router