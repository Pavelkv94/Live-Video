import { message } from "antd";
import { createData, deleteData, fetchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    users: [],
    userId: "",
    user: null,
    registerStatus: "",
    initializedStatus: ""
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_ALL_USERS:
            return { ...state, users: action.payload };

        case ActionTypes.SET_REGISTER_STATUS:
            return { ...state, registerStatus: action.payload };

        case ActionTypes.FETCH_USER:
            return { ...state, user: action.payload };
            
        case ActionTypes.SET_USER:
            return { ...state, user: action.payload };

        case ActionTypes.INITIALIZED:
            return { ...state, initializedStatus: action.payload };

        default:
            return state;
    }
}



const setStatus = (status) => ({
    type: ActionTypes.SET_REGISTER_STATUS,
    payload: status,
});

const fetchAllUsersAction = (users) => ({
    type: ActionTypes.FETCH_ALL_USERS,
    payload: users,
});

export const fetchAllUsers = () => async (dispatch) => {
    const response = fetchData(ActionTypes.usersUrl(), {}, {}, '');

    response.then(
        (res) => dispatch(fetchAllUsersAction(res.data)),
        (err) => console.log(err)
    );
};

const fetchUserAction = (payload) => ({
    type: ActionTypes.FETCH_USER,
    payload
});

export const fetchUser = (userId) => (dispatch) => {
    const response = fetchData(ActionTypes.userUrl(userId), {});

    response.then(
        (res) => {
            dispatch(fetchUserAction(res.data));
        },
        (err) => console.log(err)
    );
};

export const setCurrentUser = (payload) => ({
    type: ActionTypes.SET_USER,
    payload
})

const registerAction = (payload) => ({
    type: ActionTypes.REGISTER_USER,
    payload: createData(ActionTypes.usersUrl(), {}, payload),
});

export const registerUser = (payload) => (dispatch) => {
    dispatch(setStatus("pending"));
    const response = dispatch(registerAction(payload));

    response.payload.then(
        (res) => {dispatch(setStatus("fulfilled"));
     message.success("Success!");},
        (err) => {
            console.log(err);
            dispatch(setStatus("rejected"));
            message.error(err.response.data ? err.response.data.data.message : 'Error')
        }
    );
};

const deleteUserAction = (id) => ({
    type: ActionTypes.DELETE_USER,
    payload: deleteData(ActionTypes.userUrl(id), {}),
});

export const deleteUser = (id) => (dispatch) => {
    const response = dispatch(deleteUserAction(id));

    response.payload.then(
        (res) => console.log("DELETE Success"),
        (err) => console.log(err)
    );
};


const initializedAction = (status) => ({
    type: ActionTypes.INITIALIZED,
    payload: status
});

export const initializedApp = () => (dispatch) => {
    dispatch(initializedAction('pending'))
    let res1 = dispatch(fetchAllUsers());
    let res2 = dispatch(setCurrentUser(JSON.parse(localStorage.getItem('user')))) ;

    Promise.all([res1, res2]).then(
        (res) =>{ dispatch(initializedAction('complete'))},
        (err) => console.log(err))
    
}