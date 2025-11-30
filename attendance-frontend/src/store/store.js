import { configureStore } from '@reduxjs/toolkit';
import authReducer from './useAuth';

export default configureStore({
  reducer: { auth: authReducer }
});
