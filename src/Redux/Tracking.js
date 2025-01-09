import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getTasksData: [],
  editTableData: {}
}

export const TrackingSlice = createSlice({
    name: "systemSlice",
    initialState,
    reducers: {
      setEditTableData: (state, action) => {
        return {
          ...state,
          editTableData: action.payload,
        };
      },
      setGetTasksData: (state, action) => {
        return {
          ...state,
          getTasksData: action.payload,
        };
      },
    }
})

export const {
  setEditTableData,
  setGetTasksData
  } = TrackingSlice.actions;
  
  export const TrackingReducer = TrackingSlice.reducer;