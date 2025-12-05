import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    username: null, // New state to store username
  },
  reducers: {
    setUserDataAndLogin(state, action) {
      // New action for login with data
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = null; // Clear username on logout
    },
    // Removed toggleLogin
  },
});

export const { setUserDataAndLogin, logout } = authSlice.actions;
export default authSlice.reducer;
