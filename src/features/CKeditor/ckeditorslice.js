import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stepDescription: ''
};

const stepDescriptionSlice = createSlice({
  name: 'stepDescription',
  initialState,
  reducers: {
    setStepDescription: (state, action) => {
      state.stepDescription = action.payload;
    },
    clearStepDescription: (state) => {
      state.stepDescription = '';
    }
  }
});

export const { setStepDescription, clearStepDescription } = stepDescriptionSlice.actions;

export default stepDescriptionSlice.reducer;
