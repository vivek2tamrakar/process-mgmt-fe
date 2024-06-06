import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  groupList: []
};

const menu = createSlice({
  name: 'group',
  initialState,
  reducers: {
    getGroupList(state, action) {
      state.groupList = action.payload.groupList;
    }
  }
});

export default menu.reducer;

export const { getGroupList } = menu.actions;
