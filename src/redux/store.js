import { configureStore } from "@reduxjs/toolkit";
import reduxStorage from "./storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import rootReducer from "./rootRuducer";

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    whitelist: ['game']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST]
        }
    })
})


export const persistor = persistStore(store);