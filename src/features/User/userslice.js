import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserList(state, action) {
      state.userList = action.payload.userList;
    },
  },
});

export default user.reducer;

export const { getUserList } = user.actions;
