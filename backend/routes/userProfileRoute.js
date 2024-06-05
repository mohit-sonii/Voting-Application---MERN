
import bodyParser from 'body-parser'
import express from 'express'
import user from '../model/user.js'
const router= express.Router()
router.use(bodyParser.json())

router.get('/:id',async(req,res)=>{
     try {
          const id = req.params.id
          const oneData = await user.findById(id)
          if (!oneData) {
               return res.status(404).json({ message: 'User not found' });
          }
          console.log(oneData)
          res.status(200).json(oneData)
     } catch (error) {
          res.status(500).json({message:'Error in finding the user with this ID'})
          console.log(error.message)
     }
     
})

export default router