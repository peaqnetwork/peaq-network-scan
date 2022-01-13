import { createSlice } from "@reduxjs/toolkit";

export const currentBlockNumberSlice = createSlice({
  name: "currentBlockNumber",
  initialState: {
    value: 0,
  },
  reducers: {
    setCurrentBlockNumber: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentBlockNumber } = currentBlockNumberSlice.actions;

export default currentBlockNumberSlice.reducer;
