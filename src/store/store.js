import { configureStore } from "@reduxjs/toolkit";
import latestBlocksReducer from "./slices/latest-blocks-slice";
import currentBlockNumberReducer from "./slices/current-block-number-slice";

export default configureStore({
  reducer: {
    latestBlocks: latestBlocksReducer,
    currentBlockNumber: currentBlockNumberReducer,
  },
});
