
// model to store the districts and states json data in the databse


import mongoose, { Schema } from 'mongoose'

const districtStateSchema = new Schema({
     apiData: {
          type: Object
     }
})

export const DistrictState = mongoose.model('DistrictState', districtStateSchema)