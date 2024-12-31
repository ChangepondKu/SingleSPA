// fallbackStore.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
// import storage from 'redux-persist/lib/storage';
import userReducer from "./slice/userSlice";


// Fallback reducer configuration
const persistConfig = {
  key: 'fallback navbar',
  storage : sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const fallbackStore = configureStore({
  reducer: {
    fallback: persistedReducer,
  },
});

const fallbackPersistor = persistStore(fallbackStore);

export { fallbackStore, fallbackPersistor };
