import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  origin: null,
  destination: null,
  currentChargeInkWh: 0,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setCarCharge: (state, action) => {
      state.currentChargeInkWh = action.payload;
    },
  },
});
export const { setOrigin, setDestination, setCarCharge } = tripSlice.actions;
export default tripSlice.reducer;
