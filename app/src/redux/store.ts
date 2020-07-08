import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { default as settingsReducer } from './settings';

export const browserHistory = createBrowserHistory();

const rootReducer = combineReducers({
    settings: settingsReducer,
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
    key: 'settings',
    version: 1,
    storage,
    whitelist: ['settings'],
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
