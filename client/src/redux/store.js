import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: "root",
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  //das hier lt. udemy hinzufügen - warum muss noch gecheckt werden
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export const persistor = persistStore(store)