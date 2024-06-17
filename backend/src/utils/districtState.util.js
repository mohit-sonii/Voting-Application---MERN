

// Extracting the states object from the json and to check whether the data already exisits or not,if not then do add the data but if ues then simply return.


import { handleError } from './handleError.util.js'
import { DistrictState } from '../models/districtState.model.js'
import data from '../districts-States.json' assert{type: 'json'} // here type is json mandatory beacuse we have .json file and we have to use it with this assert object.

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

     } catch (err) {
          console.log(err.message, "Error in creating the state and district API")
          throw new handleError(err, "Error in DistrictState js", 500)
     }
}
