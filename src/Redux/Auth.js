import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
}

export const AuthSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
      setIsLoggedIn: (state, action) => {
        return {
          ...state,
          isLoggedIn: action.payload,
        };
      },
    }
})

export const {
    setIsLoggedIn,
  } = AuthSlice.actions;
  
  export const AuthReducer = AuthSlice.reducer;