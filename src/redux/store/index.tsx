import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import favoritesReducer from "../reducers/favoritesReducer";
import selectedArticleReducer from "../reducers/selectArticleReducer";
import setPreviewReducer from "../reducers/setPreviewReducer";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      // ? review
      secretKey: process.env.REACT_APP_PERSIST_KEY!,
    }),
  ],
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  selectedArticle: selectedArticleReducer,
  previewData: setPreviewReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
