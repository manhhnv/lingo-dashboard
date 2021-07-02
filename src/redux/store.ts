import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { fetchProfile } from "./slices/adminSlice";

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}),
    devTools: process.env.NODE_ENV === 'development' ? true : false
});
store.dispatch(fetchProfile());

export const persistor = persistStore(store);
export default store;