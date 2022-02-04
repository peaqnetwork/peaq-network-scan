import { createSlice } from "@reduxjs/toolkit";

export const bestNumberFinalizedSlice = createSlice({
  name: "bestNumberFinalized",
  initialState: {
    value: 0,
  },
  reducers: {
    setBestNumberFinalized: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBestNumberFinalized } = bestNumberFinalizedSlice.actions;

export default bestNumberFinalizedSlice.reducer;
