import { message } from "antd";
import * as ActionTypes from "./AppConstants.js";
import { createData, deleteData, fetchData, patchData } from "../api/api.js";
import { setCurrentUserAction } from "./authReducer.js";

const initialState = {
    usersList: [],
    usersStatus: ""
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_ALL_USERS:
        return { ...state, usersList: action.payload };
    case ActionTypes.SET_USERS_STATUS:
        return { ...state, usersStatus: action.payload };
    case ActionTypes.CREATE_USER:
        return { ...state, usersList: [...state.usersList, action.payload] };
    case ActionTypes.DELETE_USER:
        return { ...state, usersList: state.usersList.filter((el) => el.user_id !== action.user_id) };
    case ActionTypes.ADMIN_EDIT_USER:
        return { ...state, usersList: state.usersList.map((el) => el.user_id === action.payload.user_id ? action.payload : el) };

    default:
        return state;
    }
}

// const setStatus = (status) => ({
//     type: ActionTypes.SET_USERS_STATUS,
//     payload: status
// });

const fetchAllUsersAction = (users) => ({
    type: ActionTypes.FETCH_ALL_USERS,
    payload: users
});

export const fetchAllUsers = () => async (dispatch) => {
    const response = fetchData(ActionTypes.usersUrl(), {}, {});

    response.then(
        (res) => dispatch(fetchAllUsersAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const createUserAction = (payload) => ({
    type: ActionTypes.CREATE_USER,
    payload
});

export const createUser = (payload) => (dispatch) => {
    const response = createData(ActionTypes.usersUrl(), {}, payload);

    response.then(
        (res) => {
            dispatch(createUserAction(res.data));
            message.success("Success!");
        },
        (err) => {
            message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );
};

const updateUserAction = (payload) => ({
    type: ActionTypes.UPDATE_USER,
    payload
});

export const updateUser = (user_id, payload) => (dispatch) => {
    const response = patchData(ActionTypes.userUrl(user_id), {}, payload);

    response.then(
        (res) => {
            localStorage.setItem("user", JSON.stringify(res));
            dispatch(setCurrentUserAction(res));
            dispatch(updateUserAction(res));
            message.success("Success!");
        },
        (err) => {
            message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );
};

// eslint-disable-next-line no-unused-vars
export const sendFeedback = (payload) => async (dispatch) => {
    const response = createData(ActionTypes.feedbackUrl(), {}, payload);

    response.then(
        () => message.success("Success!"),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const deleteUserAction = (user_id) => ({
    type: ActionTypes.DELETE_USER,
    user_id
});

export const deleteUser = (user_id) => (dispatch) => {
    const response = deleteData(ActionTypes.userUrl(user_id), {});

    response.then(
        () => {
            dispatch(deleteUserAction(user_id));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

// eslint-disable-next-line no-unused-vars
export const resendActivationMail = (email) => (dispatch) => {
    const response = fetchData(ActionTypes.activationUrl(email), {});
    response.then(
        () => {
            message.success("Success! Check your mail.");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};


const editAsAdminUserAction = (payload) => ({
    type: ActionTypes.ADMIN_EDIT_USER,
    payload
});

export const editAsAdminUser = (user_id, payload) => (dispatch) => {
    const response = patchData(ActionTypes.userUrl(user_id), {}, payload);

    response.then(
        (res) => {
            dispatch(editAsAdminUserAction(res));
            message.success("Success!");
        },
        (err) => {
            message.error(err.response.data.message ? err.response.data.message : "Error");
        }
    );
};