import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/features/auth/authSlice';
import groupReducer from '../../src/features/Group/groupslice';
import userReducer from '../../src/features/User/userslice';
import processReducer from '../../src/features/process/processSlice';
import featuresReducer from '../../src/features/step/stepSlice';
import stepDescriptionReducer from '../../src/features/CKeditor/ckeditorslice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    user: userReducer,
    process: processReducer,
    features: featuresReducer,
    stepDescription: stepDescriptionReducer
  }
});

export default store;
