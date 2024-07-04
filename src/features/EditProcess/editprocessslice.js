// // features/process/processSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   selectedProcess: {
//     id: null,
//     name: '',
//     description: '',
//     tags: '',
//     steps: []
//   }
// };

// const processSlice = createSlice({
//   name: 'process',
//   initialState,
//   reducers: {
//     setSelectedProcess: (state, action) => {
//       state.selectedProcess = action.payload;
//     },
//     updateProcessName: (state, action) => {
//       state.selectedProcess.name = action.payload;
//     },
//     updateProcessDescription: (state, action) => {
//       state.selectedProcess.description = action.payload;
//     },
//     updateProcessTags: (state, action) => {
//       state.selectedProcess.tags = action.payload;
//     }

//     // Other reducers as needed
//   }
// });

// export const { setSelectedProcess, updateProcessName, updateProcessDescription, updateProcessTags } = processSlice.actions;

// export default processSlice.reducer;
