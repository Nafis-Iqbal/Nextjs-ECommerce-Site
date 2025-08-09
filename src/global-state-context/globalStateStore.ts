import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './authSlice';
import commonPopUpReducer from './commonPopUpSlice'
import cartUpdatePopUpReducer from './cartUpdateSlice';


// Configure the store
const store = configureStore({
    reducer: {
      auth: authReducer,
      popUps: commonPopUpReducer,
      cartUpdatePopUp: cartUpdatePopUpReducer,
    },
  });
  
// Export the store
export default store;