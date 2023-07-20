import { configureStore } from '@reduxjs/toolkit'
import userDetailSlice from './userDetailSlice'


export const store = configureStore({
  reducer: {
    userDetail: userDetailSlice,
  },
})
