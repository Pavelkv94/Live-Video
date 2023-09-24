import { message } from "antd";
import { createData, deleteData, patchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    user: null,
    authStatus: "",
    registerStatus: "",
    emailStatus: "",
    recoveryStatus: ""
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.SET_REGISTER_STATUS:
        return { ...state, registerStatus: action.payload };

    case ActionTypes.SET_USER:
        return { ...state, user: action.payload };

    case ActionTypes.SET_AUTH_STATUS:
        return { ...state, authStatus: action.payload };

    case ActionTypes.SET_EMAIL_STATUS:
        return { ...state, emailStatus: action.payload };

    case ActionTypes.SET_RECOVERY_STATUS:
        return { ...state, recoveryStatus: action.payload };

    default:
        return state;
    }
}

const setAuthStatus = (status) => ({
    type: ActionTypes.SET_AUTH_STATUS,
    payload: status
});

const setStatus = (status) => ({
    type: ActionTypes.SET_REGISTER_STATUS,
    payload: status
});

const setEmailStatus = (status) => ({
    type: ActionTypes.SET_EMAIL_STATUS,
    payload: status
});

const setRecoveryStatus = (status) => ({
    type: ActionTypes.SET_RECOVERY_STATUS,
    payload: status
});

export const setCurrentUserAction = (payload) => ({
    type: ActionTypes.SET_USER,
    payload
});

export const registerUser = (payload) => (dispatch) => {
    dispatch(setStatus("pending"));
    const response = createData(ActionTypes.usersUrl(), {}, payload);

    response.then(
        () => {
            dispatch(setStatus("fulfilled"));
            message.success("Success!");
        },
        (err) => {
            dispatch(setStatus("rejected"));
            message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );
};

export const sendLinkToEmail = (payload) => (dispatch) => {
    dispatch(setEmailStatus("pending"));
    const response = createData(ActionTypes.passwordRecovery(), {}, payload);

    response.then(
        () => {
            dispatch(setEmailStatus("fulfilled"));
            message.success("Message was sent to your email!");
        },
        (err) => {
            dispatch(setEmailStatus("rejected"));
            message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );
};

export const restorePassword = (token, payload) => (dispatch) => {
    dispatch(setRecoveryStatus("pending"));
    const response = createData(ActionTypes.passwordRecoveryToken(token), {}, payload);

    response.then(
        () => {
            dispatch(setRecoveryStatus("fulfilled"));
            message.success("Password is restored!");
        },
        (err) => {
            dispatch(setRecoveryStatus("rejected"));
            message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );
};

export const loginUser = (payload) => (dispatch) => {
    dispatch(setAuthStatus("pending"));
    const response = createData(ActionTypes.sessionUrl(), {}, payload);
    response.then(
        (res) => {
            dispatch(setAuthStatus("fulfilled"));

            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch(setCurrentUserAction(res.data));
        },
        (err) => {
            dispatch(setAuthStatus("rejected"));

            if (err.response.status === 500) {
                message.error("Something Wrong");
            } else message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );
};

export const logoutUser = () => (dispatch) => {
    const response = deleteData(ActionTypes.sessionUrl(), {});

    response.then(
        () => {
            dispatch(setCurrentUserAction(null));
            localStorage.removeItem("user");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

export const updateUser = (id, payload) => (dispatch) => {
    dispatch(setAuthStatus("pending"));
    const response = patchData(ActionTypes.userUrl(id), {}, payload);
    response.then(
        (res) => {
            dispatch(setAuthStatus("fulfilled"));
            // localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(res));
            dispatch(setCurrentUserAction(res));
            message.success("Success!");
        },
        (err) => {
            dispatch(setAuthStatus("rejected"));

            if (err.response.status === 500) {
                message.error("Something Wrong");
            } else message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );
};