import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/features/auth/authSlice";
import groupReducer from "../../src/features/Group/groupslice";
import userReducer from "../../src/features/User/userslice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    user: userReducer,
  },
});

export default store;
