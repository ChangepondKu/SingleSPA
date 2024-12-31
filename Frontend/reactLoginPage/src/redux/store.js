import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import userReducer from "./userSlice/userSlice";
import sessionStorage from "redux-persist/lib/storage/session";

// Persist configuration
const persistConfig = {
  key: 'fallback login',
  storage : sessionStorage,
};

// Wrap the user reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Authentication middleware
const authMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'navigation/protectedRoute') {
    const state = storeAPI.getState();
    if (!state.user?.name) {
      // Redirect unauthenticated user
      window.location.href = '/auth/signin';
      return;
    }
  }
  return next(action);
};

// Configure store with middleware
const fallbackStore = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authMiddleware),
});

export const fallbackPersistor = persistStore(fallbackStore);
export default fallbackStore;
