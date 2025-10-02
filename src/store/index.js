import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../slices/courseSlices.js";
import authReducer from "../slices/authSlice.js";

const store = configureStore({
  reducer: {
    courses: courseReducer, // state course
    auth: authReducer, // state auth (register/login)
  },
});

export default store;
