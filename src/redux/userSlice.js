import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  city: "",
  country: "",
  car: null,
  password: "",
  isSignIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setProfile: (state, action) => {
      (state.firstname = action.payload.firstname),
        (state.lastname = action.payload.lastname);
      (state.city = action.payload.city),
        (state.country = action.payload.country);
    },
    setCar: (state, action) => {
      state.car = action.payload;
      state.isSignIn = true;
    },
    getUser: (state, action) => {},
  },
});
export const { setEmail, setProfile, setCar } = userSlice.actions;
export default userSlice.reducer;
