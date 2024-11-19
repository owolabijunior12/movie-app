import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favoritesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";


const persistConfig = {
    key: "root",
    storage,
  };
  
  const persistedFavoritesReducer = persistReducer(persistConfig, favoritesReducer);
  
  export const store = configureStore({
    reducer: {
      favorites: persistedFavoritesReducer,
    },
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);


