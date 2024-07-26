
import mongoose, { Schema, Document } from 'mongoose'


interface DistrictStateModel extends Document {
   apiData?: object
}

const districtStateSchema:Schema = new Schema({
   apiData: {
      type: Object
   }
})

export const DistrictState = mongoose.model<DistrictStateModel>('DistrictState', districtStateSchema)