import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.js";
import productsReducer from "./productsSlice.js";
import authReducer from "./authSlice.js";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    auth: authReducer,
  },
});

export default store;