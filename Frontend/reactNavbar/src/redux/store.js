// fallbackStore.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Example slice for the fallback store
const fallbackSlice = createSlice({
  name: 'fallback',
  initialState: { message: 'Fallback store in use' },
  reducers: {},
});

// Fallback reducer configuration
const persistConfig = {
  key: 'fallback',
  storage,
};

const persistedReducer = persistReducer(persistConfig, fallbackSlice.reducer);

const fallbackStore = configureStore({
  reducer: {
    fallback: persistedReducer,
  },
});

const fallbackPersistor = persistStore(fallbackStore);

export { fallbackStore, fallbackPersistor };
