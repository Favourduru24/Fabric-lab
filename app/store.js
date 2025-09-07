import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "@/app/api/apiSlice";
// import authReducer from '../features/auth/authSlice';
 

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store
setupListeners(store.dispatch);