import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  groupList: [],
  folderList: [],
  processList: []
};

const menu = createSlice({
  name: 'group',
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
    }
  }
});

export default menu.reducer;

export const { getGroupList, getFolderList, getProcessList } = menu.actions;
