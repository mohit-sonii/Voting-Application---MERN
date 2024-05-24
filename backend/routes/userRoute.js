
import express from 'express'
import user from '../model/user.js'
import generateToken from '../jwt.js'

const router = express.Router()
router.post('/auth/signup', async (req, res) => {
     try {
          const data = req.body;
          const newUser = new user(data)
          const response = await newUser.save()
          console.log('A new user is saved')
          const payload = {
               id: response.id
          }
          const token = generateToken(payload)
          res.status(200).json({ response: response, token: token })
     } catch (error) {
          console.log('Error in adding a new user', error.message)
          res.status(400).json({ error: error.message })
     }
})

router.get('/', async (req, res) => {
     try {
          const showData = await user.find();
          res.status(200).json(showData)

     } catch (err) {
          res.status(400).json({ message: "Failed to get the Data from DBMS" })
          console.log(err + " Error in getting data from server")
     }
})

router.post('/auth/login', async (req, res) => {
     try {
          const { uniqueIdNumber, password } = req.body
          const userData = await user.findOne({ uniqueIdNumber: uniqueIdNumber })
          const passMatch = await userData.comparePassword(password)
          if (!userData || !passMatch) return res.status(204).json({ response: 'Either unique Number or password is incorrect' })
          const payload = {
               id: userData.id
          }
          const token = generateToken(payload)
          res.status(200).json((token))
     } catch (error) {
          console.log('Error in login request', error)
          res.status(400).json({ error: error })
     }
})


export default router