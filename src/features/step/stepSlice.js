import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddStepEnabled: true
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    toggleAddStep(state) {
      state.isAddStepEnabled = !state.isAddStepEnabled;
    }
  }
});

export const { toggleAddStep } = featuresSlice.actions;
export default featuresSlice.reducer;
