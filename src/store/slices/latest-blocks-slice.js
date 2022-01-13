import { createSlice } from "@reduxjs/toolkit";

export const latestBlocksSlice = createSlice({
  name: "latestBlocks",
  initialState: {
    value: [],
  },
  reducers: {
    setLatestBlocks: (state, action) => {
      state.value = [action.payload, ...state.value].slice(0, 99);
    },
    setExistingBlock: (state, action) => {
      // Edit existing block data.
      console.log("existing block received");
      // Get block index
      const blockIndex = state.value.findIndex(
        (block) => block.blockNumber === action.payload.blockNumber
      );
      console.log("existing blockindex", blockIndex);
      // Replace specific block data
      if (blockIndex > -1) {
        const updatedBlocks = [...state.value];
        updatedBlocks[blockIndex] = action.payload;

        state.value = updatedBlocks;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLatestBlocks, setExistingBlock } = latestBlocksSlice.actions;

export default latestBlocksSlice.reducer;
