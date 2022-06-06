import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { authReducer } from "./authReducer";
import { camerasReducer } from "./camerasReducer"
const rootReducer = combineReducers({
    authReducer,
    camerasReducer,
});

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);
