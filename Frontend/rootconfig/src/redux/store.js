import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./slice/userSlice";
import sessionStorage from "redux-persist/lib/storage/session";

// Persist configuration
const persistConfig = {
  key: 'root',
  storage : sessionStorage,
};

// Wrap the user reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);


// Configure store with middleware
const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
