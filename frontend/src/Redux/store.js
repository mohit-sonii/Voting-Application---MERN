
import { configureStore } from "@reduxjs/toolkit";
import userValuesReducer from "./slicer"

export const store = configureStore({
     reducer: {
          userValues: userValuesReducer
     }
})