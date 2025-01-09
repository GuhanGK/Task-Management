import { configureStore } from '@reduxjs/toolkit'
import { TrackingReducer } from './Tracking'
import { AuthReducer } from './Auth'

export const store = configureStore({
  reducer: {
    taskTracking: TrackingReducer,
    auth: AuthReducer
  },
})
