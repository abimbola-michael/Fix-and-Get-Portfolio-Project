import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/slices/appSlice.js";
import { createWrapper } from "next-redux-wrapper";
const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(() => store);
export { store };
