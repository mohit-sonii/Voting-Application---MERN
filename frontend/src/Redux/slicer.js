
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
     voted: false,
     userId: ''
}
export const userValuesSlice = createSlice({
     name: "userValues",
     initialState,
     reducers: {
          toogleVoted: (state) => {
               state.voted = true
          },
          setUserId: (state, action) => {
               state.userId = action.payload

          }
     }
})

export const {toogleVoted,setUserId} = userValuesSlice.actions

export default userValuesSlice.reducer