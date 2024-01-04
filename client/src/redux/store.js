import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"

export const store = configureStore({
  reducer: {user: userReducer},
  //das hier lt. udemy hinzufügen - warum muss noch gecheckt werden
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializeableCheck: false,
  })
})