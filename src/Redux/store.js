import { configureStore } from '@reduxjs/toolkit'
import { TrackingReducer } from './Tracking'

export const store = configureStore({
  reducer: {
    mediaTracking: TrackingReducer
  },
})
