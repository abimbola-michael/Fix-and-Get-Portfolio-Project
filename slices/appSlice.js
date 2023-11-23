import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: 0,
  category: -1,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeTab(state, action) {
      state.tab = action.payload;
    },
    changeCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { changeTab, changeCategory } = appSlice.actions;
