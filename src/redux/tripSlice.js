import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  origin: null,
  destination: null,
  currentChargeInkWh: 0,
  apiData: null,
  markers: [],
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
    setApiData: (state, action) => {
      state.apiData = action.payload;
    },
    setMarkers: (state, action) => {
      state.markers = [...action.payload];
    },
  },
});
export const { setOrigin, setDestination, setCarCharge, setApiData } =
  tripSlice.actions;
export default tripSlice.reducer;
