import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import tripSlice from "./tripSlice";

const store = configureStore({
  reducer: { auth: authReducer, user: userReducer, trip: tripSlice },
});

export default store;
