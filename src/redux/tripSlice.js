import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  origin: null,
  destination: null,
  currentChargeInkWh: 0,

  originLocation: "",
  destinationLocation: "",
  avgSpeed: 0,
  addWeight: 0,
  departTime: "",
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
    setDepartData: (state, action) => {
      state.departTime = action.payload;
    },
    setSpeed: (state, action) => {
      state.avgSpeed = action.payload;
    },
    setWeight: (state, action) => {
      state.addWeight = action.payload;
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
  setDepartData,
  setSpeed,
  setWeight,
} = tripSlice.actions;
export default tripSlice.reducer;
