import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const user = createSlice({
  name: "my",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload.user;
    },
  },
});

export default user.reducer;

export const { getUser } = user.actions;
