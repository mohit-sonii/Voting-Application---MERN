
import db from "../db.js";
import express from 'express'
const router = express.Router()

router.get('/api-data',async(req,res)=>{
     try{
          //going to the collection where the data is stored
          const apiCollection = db.collection('api')
          // converting the collection data into an array
          const apiData = await apiCollection.find().toArray()
          //extracting only states array values
          const stateArray = apiData.map((item)=>item.states).flat()

          //extracting only states name
          // const onlyState = stateArray.map(item=>item.state)
          res.status(200).json(stateArray)
 
          //to get a district list of a particular state.
          /*
          const distList = stateArray.find(item=>item.state.toLowerCase() === "bihar")
          if(distList){
               res.status(200).json(distList.districts)
          }else{
               res.status(200).json({message:'Not find'})

          }*/

     }
     catch(err){
          res.status(500).json({err:'Errror fethcing the details',err:err})
          console.log('Errror gethcing the aPi')
     }
})

export default router