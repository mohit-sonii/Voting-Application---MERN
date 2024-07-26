


import { DistrictState } from '../models/districtState.model'
import { ApiError } from './handlers'
import data from '../districts-States.json'

export const createStateAndDistrict = async () => {
   try {
      const state = data.states
      const alreadyExist = await DistrictState.findOne({ "apiData.states": state })
      if (!alreadyExist) {
         const newJSON = new DistrictState({ apiData: data })
         await newJSON.save()
      } else {
         return
      }
   } catch (err: any) {
      throw new ApiError(500,'Error while fetching the details')
   }
}
