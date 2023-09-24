import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { authReducer } from "./authReducer";
import { camerasReducer } from "./camerasReducer";
import { storagesReducer } from "./storagesReducer";
import { videosReducer } from "./videosReducer";
import { schedulesReducer } from "./schedulesReducer";
import { usersReducer } from "./usersReducer";
import { trackersReducer } from "./trackersReducer";
import { monitoringObjectsReducer } from "./monitoringObjectsReducer";
import { notificationsReducer } from "./notificationsReducer";
import { tariffsReducer } from "./tariffsReducer";
import { balanceReducer } from "./balanceReducer";


const rootReducer = combineReducers({
    authReducer,
    camerasReducer,
    storagesReducer,
    videosReducer,
    schedulesReducer,
    usersReducer,
    trackersReducer,
    monitoringObjectsReducer,
    notificationsReducer,
    tariffsReducer,
    balanceReducer
});

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);
