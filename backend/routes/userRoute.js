
import express, { response } from 'express'
import user from '../model/user.js'
import generateToken from '../jwt.js'
import admin from '../model/admin.js'
import bodyParser from 'body-parser'

const router = express.Router()
router.use(bodyParser.json())

// import db from '../db.js'


let currentUserType = 'user'; // Variable to hold the current user type

const setUserType = (value) => {
     currentUserType = value;
};

const whoTheUser = () => {
     return currentUserType; // Return the user type
};
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
          if (whoTheUser() === 'admin') {

               // to see the data 
               const showData = await user.find();
               res.status(200).json(showData)
          } else {
               res.status(401).json({ response: 'You are not authorized to use this API' })
          }

     } catch (err) {
          res.status(400).json({ response: "Failed to get the Data from DBMS" })
          console.log(err + " Error in getting data from server")
     }
})

router.post('/auth/login', async (req, res) => {
     try {
          //take the Id and password from the body field
          const { uniqueId, password } = req.body
          // check if the user exist or not
          const userData = await user.findOne({ uniqueId })
          // chekc if the admin with the same user exist or not
          const adminData = await admin.findOne({ uniqueId })
          //if user does not exist with the Id 
          if (!userData) {
               // check if it is an admin or not
               if (adminData) {
                    // compare the password with the stored password for admin
                    const adminPassMatch = await adminData.comparePassword(password)
                    // if teh password is ok
                    if (adminPassMatch) {
                         // get that person ID
                         const payload = { id: adminData.id }
                         //generate token for that person
                         const token = generateToken(payload)
                         //print that you are an admin
                         // toggle who the user is
                         setUserType('admin')
                         // give response 
                         res.status(200).json({ adminData, token })
                    }
                    // if the password if not correct
                    else {
                         res.status(400).json({ response: 'Either Id aur password is incorrect' })
                    }
               }
               // if the admin does not exist with the ID given
               else {
                    res.status(201).json({ response: 'User not Registered' })
               }
          }
          // if the user exist with the ID 
          else {
               // compare its password with the stored one
               const passMatch = await userData.comparePassword(password)
               // if the password is correct
               if (passMatch) {
                    //get the Id of that user from userData
                    const payload = { id: userData.id }
                    // generate token for that ID
                    const token = generateToken(payload)
                    // send response
                    res.status(200).json({ userData, token })
               }
               // if the passowrd is incorrect
               else {
                    res.status(400).json({ response: 'Either Id aur password is incorrect' })
               }
          }
     } catch (err) {
          res.status(400).json({ error: err.message })
     }
})

router.post('/auth/forget-password', async (req, res) => {
     // extract two field from body 
     const { uniqueId, voter } = req.body
     //if required fields are not mentioned  
     if (!uniqueId || !voter) return res.status(400).json({ message: 'Required Fields are Missing' })

     try {
          // find a user with that unique Id the user has
          const userId = await user.findOne({ uniqueId: uniqueId })
          // find the user with that voter card as well
          const userVoter = await user.findOne({ voter: voter })
          // if any of them is incorrect then return the error
          if (!userId || !userVoter)
               return res.status(204). json({ message: 'Ussssser does not exist.' })
          //extract the id from the userId and redirect user to another route
          res.redirect(`/auth/forget-password/create-new-password/${userId._id}`)

     } catch (err) {
          console.log('error in forgetting the passworrd')
          res.send(400).json({ error: err })
     }
})

router.patch('/auth/forget-password/create-new-password/:id', async (req, res) => {
     // extract Id from that URL
     const { id } = req.params
     // extract password field as this is the only this which we want to update
     const { password } = req.body;
     try {
          // we will find the data using the Id and will update the password
          const updateData = await user.findByIdAndUpdate(id, { password }, {
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



// export  {router,whoTheUser}
export { router as userRoute, whoTheUser, setUserType }