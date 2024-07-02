import { createSlice } from '@reduxjs/toolkit';

const processSlice = createSlice({
  name: 'process',
  initialState: {
    selectedProcess: null
  },
  reducers: {
    setSelectedProcess: (state, action) => {
      state.selectedProcess = action.payload;
    },
    clearSelectedProcess: (state) => {
      state.selectedProcess = null;
    }
  }
});

export const { setSelectedProcess, clearSelectedProcess } = processSlice.actions;
export default processSlice.reducer;
