import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { authReducer } from "./authReducer";
import { camerasReducer } from "./camerasReducer";
import { storagesReducer } from "./storagesReducer";
import { videosReducer } from "./videosReducer";
import { schedulesReducer } from "./schedulesReducer";

const rootReducer = combineReducers({
    authReducer,
    camerasReducer,
    storagesReducer,
    videosReducer,
    schedulesReducer
});

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);
