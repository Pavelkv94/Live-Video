import { message } from "antd";
import { createData, deleteData, patchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    user: null,
    authStatus: "",
    registerStatus: "",
    emailStatus: "",
    recoveryStatus: "",
    connectedUser: null
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.SET_REGISTER_STATUS:
        return { ...state, registerStatus: action.payload };

    case ActionTypes.SET_USER:
        return { ...state, [state.user?.admin ? "connectedUser" : "user"]: action.payload };

    case ActionTypes.SET_LOGOUT_USER:
        return { ...state, user: null, connectedUser: null};

    case ActionTypes.SET_AUTH_STATUS:
        return { ...state, authStatus: action.payload };

    case ActionTypes.SET_EMAIL_STATUS:
        return { ...state, emailStatus: action.payload };

    case ActionTypes.SET_RECOVERY_STATUS:
        return { ...state, recoveryStatus: action.payload };

    case ActionTypes.ADMIN_CONNECT_TO_USER:
        return { ...state, connectedUser: action.user };

    case ActionTypes.ADMIN_DISCONNECT_FROM_USER:
        return { ...state, connectedUser: null };

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

const setlogoutUserAction = () => ({
    type: ActionTypes.SET_LOGOUT_USER
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
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
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
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
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
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
        }
    );
};

export const loginUser = (payload) => (dispatch) => {
    dispatch(setAuthStatus("pending"));
    const response = createData(ActionTypes.sessionUrl(), {}, payload);
    response.then(
        (res) => {
            dispatch(setAuthStatus("fulfilled"));
            const savedData = res.data.phone ? {...res.data, admin: false} : {...res.data, admin: true};
            localStorage.setItem("user", JSON.stringify(savedData));

            dispatch(setCurrentUserAction(savedData));
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
            dispatch(setlogoutUserAction());
            localStorage.removeItem("user");
            localStorage.removeItem("selected_user");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

export const updateUser = (id, payload, fromAdmin) => (dispatch) => {
    dispatch(setAuthStatus("pending"));
    const response = patchData(ActionTypes.userUrl(id), {}, payload);
    response.then(
        (res) => {
            dispatch(setAuthStatus("fulfilled"));
            // localStorage.removeItem("user");
            localStorage.setItem(fromAdmin ? "selected_user" : "user", JSON.stringify(res));
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

//ADMIN CONNECT USERS
export const connectToUserAction = (user) => ({
    type: ActionTypes.ADMIN_CONNECT_TO_USER,
    user
});


export const connectToUser = (payload) => (dispatch) => {
    const response = patchData(ActionTypes.selectUserAdminUrl(), {}, payload);

    response.then(
        (res) => {
            localStorage.setItem("selected_user", JSON.stringify(res));
            dispatch(connectToUserAction(res));
            message.success("Success!");
        },
        (err) => {
            if (err.response.status === 500) {
                message.error("Something Wrong");
            } else message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );

};
const disconnectFromUserAction = () => ({
    type: ActionTypes.ADMIN_DISCONNECT_FROM_USER
});

export const disconnectFromUser = () => (dispatch) => {
    const response = deleteData(ActionTypes.selectUserAdminUrl(), {});

    response.then(
        (res) => {
            localStorage.removeItem("selected_user");
            dispatch(disconnectFromUserAction(res));
            message.success("Success!");
        },
        (err) => {
            if (err.response.status === 500) {
                message.error("Something Wrong");
            } else message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );

};


const updateAdminProfileAction = (payload) => ({
    type: ActionTypes.ADMIN_PROFILE_UPDATE,
    payload
});

export const updateAdminProfile =  (id, payload) => (dispatch) => {
    const response = patchData(ActionTypes.adminsUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(updateAdminProfileAction(res));
            message.success("Success!");
        },
        (err) => {
            if (err.response.status === 500) {
                message.error("Something Wrong");
            } else message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );
};