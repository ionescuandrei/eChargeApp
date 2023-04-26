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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload.email;
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
    setUser: (state, action) => {},
  },
});
export const { setEmail, setProfile, setCar, setLocation, setUser } =
  userSlice.actions;
export default userSlice.reducer;
