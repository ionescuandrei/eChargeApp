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
  location: null,
  password: "",
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
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});
export const { setEmail, setProfile, setCar, setLocation } = userSlice.actions;
export default userSlice.reducer;
