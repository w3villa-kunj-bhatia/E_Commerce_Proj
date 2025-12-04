import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    toggleLogin(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { login, logout, toggleLogin } = authSlice.actions;
export default authSlice.reducer;
