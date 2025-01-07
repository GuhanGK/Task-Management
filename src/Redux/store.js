import { configureStore } from '@reduxjs/toolkit'
import { TrackingReducer } from './Tracking'
import { AuthReducer } from './Auth'

export const store = configureStore({
  reducer: {
    mediaTracking: TrackingReducer,
    auth: AuthReducer
  },
})
