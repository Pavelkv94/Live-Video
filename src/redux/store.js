import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { appReducer } from "./dataReducer";

const rootReducer = combineReducers({
    app: appReducer,
});

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);
