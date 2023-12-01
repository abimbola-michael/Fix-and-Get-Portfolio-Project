import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: 0,
  category: -1,
  chatId: "",
  searchId: "",
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
    changeChat(state, action) {
      state.chatId = action.payload;
    },
    changeSearch(state, action) {
      state.searchId = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { changeTab, changeCategory, changeChat, changeSearch } =
  appSlice.actions;
