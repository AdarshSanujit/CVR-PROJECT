import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/user.slice";
import usersReducer from "./features/users.slice";
import themeReducer from "./features/theme.slice";

import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage/index.js";

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage: storage.default,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);