import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  origin: null,
  destination: null,
  currentChargeInkWh: 0,

  originLocation: "",
  destinationLocation: "",
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
    setOriginLocation: (state, action) => {
      state.originLocation = action.payload;
    },
    setDestinationLocation: (state, action) => {
      state.destinationLocation = action.payload;
    },
  },
});
export const {
  setOrigin,
  setDestination,
  setCarCharge,
  setApiData,
  setOriginLocation,
  setDestinationLocation,
} = tripSlice.actions;
export default tripSlice.reducer;
