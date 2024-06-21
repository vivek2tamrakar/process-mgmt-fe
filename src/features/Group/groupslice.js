import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  groupList: [],
  folderList: [],
  processList: [],
};

const group = createSlice({
  name: "group",
  initialState,
  reducers: {
    getGroupList(state, action) {
      state.groupList = action.payload.groupList;
    },
    getFolderList(state, action) {
      state.folderList = action.payload.folderList;
    },
    getProcessList(state, action) {
      state.processList = action.payload.processList;
    },
  },
});

export default group.reducer;

export const { getGroupList, getFolderList, getProcessList } = group.actions;
