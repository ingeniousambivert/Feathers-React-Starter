import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import authReducer from "@slices/auth/";
import userReducer from "@slices/user";

const rootReducers = combineReducers({
	auth: authReducer,
	user: userReducer
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"]
};

const middleware = [
	...getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
		}
	})
	//logger
];

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default configureStore({
	reducer: persistedReducer,
	middleware
});
