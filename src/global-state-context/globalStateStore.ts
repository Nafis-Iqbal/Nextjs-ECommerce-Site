import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './authSlice';
import commonPopUpReducer from './commonPopUpSlice'

// Configure the store
const store = configureStore({
    reducer: {
      auth: authReducer,
      popUps: commonPopUpReducer,
    },
  });
  
// Export the store
export default store;