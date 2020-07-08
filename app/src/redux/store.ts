import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const browserHistory = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(browserHistory),
});

const middleware = [
    ...getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    routerMiddleware(browserHistory),
];

const preloadedState = {};

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
