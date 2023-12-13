import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: 0,
  category: -1,
  chatUserId: "",
  searchId: "",
  searchText: "",
  currentUserId: "",
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
    changeChatUserId(state, action) {
      state.chatUserId = action.payload;
    },
    changeSearch(state, action) {
      state.searchId = action.payload;
    },
    changeSearchText(state, action) {
      state.searchText = action.payload;
    },
    changeCurrentUserId(state, action) {
      state.currentUserId = action.payload;
    },
  },
});

export default appSlice.reducer;
export const {
  changeTab,
  changeCategory,
  changeSearch,
  changeSearchText,
  changeCurrentUserId,
  changeChatUserId,
} = appSlice.actions;
