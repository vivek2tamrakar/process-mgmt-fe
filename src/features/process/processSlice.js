// import { createSlice } from '@reduxjs/toolkit';

// const processSlice = createSlice({
//   name: 'process',
//   initialState: {
//     selectedProcess: null
//   },
//   reducers: {
//     setSelectedProcess: (state, action) => {
//       state.selectedProcess = action.payload;
//     },
//     clearSelectedProcess: (state) => {
//       state.selectedProcess = null;
//     }
//   }
// });

// export const { setSelectedProcess, clearSelectedProcess } = processSlice.actions;
// export default processSlice.reducer;
// features/process/processSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProcess: {
    id: null,
    name: '',
    description: '',
    tags: '',
    steps: [],
    stepId: null
  }
};

const processSlice = createSlice({
  name: 'process',
  initialState,
  reducers: {
    setSelectedProcess: (state, action) => {
      state.selectedProcess = action.payload;
    },
    updateProcessName: (state, action) => {
      state.selectedProcess.name = action.payload;
    },
    updateProcessDescription: (state, action) => {
      state.selectedProcess.description = action.payload;
    },
    updateProcessTags: (state, action) => {
      state.selectedProcess.tags = action.payload;
    },
    updateStepId: (state, action) => {
      state.selectedProcess.stepId = action.payload;
    },
    clearSelectedProcess: (state) => {
      state.selectedProcess = null;
    }
    // Other reducers as needed
  }
});

export const { setSelectedProcess, updateProcessName, updateProcessDescription, updateProcessTags, updateStepId, clearSelectedProcess } =
  processSlice.actions;

export default processSlice.reducer;
