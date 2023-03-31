import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  adress: "",
  city: "",
  country: "",
  car: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {},
    getUser: (state, action) => {},
  },
});
export const { registerUser, getUser } = authSlice.actions;
export default userSlice.reducer;
