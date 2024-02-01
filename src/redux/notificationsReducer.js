import { message } from "antd";
import {createData, deleteData, fetchData, patchData  } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";
import { logoutUser } from "./authReducer.js";

const initialState = {
    notificationsList: [],
    adminNotificationsList: []
};

export function notificationsReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_NOTIFICATIONS:
        return { ...state, notificationsList: action.payload };
    case ActionTypes.VIEW_NOTIFICATION:
        return { ...state, notificationsList: state.notificationsList.map(el => el.id === action.note_id ? {...el, viewed_at: true} : el) };
    case ActionTypes.VIEW_ALL_NOTIFICATIONS:
        return { ...state, notificationsList: state.notificationsList.map(el => ({ ...el, viewed_at: true }) )};
    case ActionTypes.DELETE_NOTIFICATION:
        return { ...state, notificationsList: state.notificationsList.filter(el => el.id !== action.note_id) };
    case ActionTypes.DELETE_ALL_NOTIFICATIONS:
        return { ...state, notificationsList: [] };

    case ActionTypes.FETCH_ADMIN_NOTIFICATIONS:
        return { ...state, adminNotificationsList: action.payload };
    case ActionTypes.CREATE_ADMIN_NOTIFICATIONS:
        return { ...state, adminNotificationsList: [action.payload, ...state.adminNotificationsList] };
    case ActionTypes.UPDATE_ADMIN_NOTIFICATIONS:
        return { ...state, adminNotificationsList: state.adminNotificationsList.map(el => el.id === action.payload.id ? action.payload : el) };
    case ActionTypes.DELETE_ADMIN_NOTIFICATIONS:
        return { ...state, adminNotificationsList: state.adminNotificationsList.filter(el => el.id !== action.note_id) };
        
    default:
        return state;
    }
}

const fetchNotificationsAction = (payload) => ({
    type: ActionTypes.FETCH_NOTIFICATIONS,
    payload: payload
});

export const fetchNotifications = (user_id) => (dispatch) => {
    const response = fetchData(ActionTypes.notificationsUrl(user_id), {}, {});

    response.then(
        (res) => dispatch(fetchNotificationsAction(res)),
        (err) => {
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
            // const localUser = localStorage.getItem("user");
            if(err.response.status === 401) {
                dispatch(logoutUser());
            }
        } 
    );
};

const viewNotificationAction = (note_id) => ({
    type: ActionTypes.VIEW_NOTIFICATION,
    note_id
});

export const viewNotification = (note_id) => (dispatch) => {
    const response = patchData(ActionTypes.notificationUrl(note_id), {}, {});

    response.then(
        () => dispatch(viewNotificationAction(note_id)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const viewAllNotificationsAction = () => ({
    type: ActionTypes.VIEW_ALL_NOTIFICATIONS
});

export const viewAllNotifications = (user_id) => (dispatch) => {
    const response = patchData(ActionTypes.notificationsUrl(user_id), {}, {});

    response.then(
        () => dispatch(viewAllNotificationsAction()),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const deleteNotificationsAction = (note_id) => ({
    type: ActionTypes.DELETE_NOTIFICATION,
    note_id
});

export const deleteNotifications = (note_id) => (dispatch) => {
    const response = deleteData(ActionTypes.notificationUrl(note_id), {}, {});

    response.then(
        () => dispatch(deleteNotificationsAction(note_id)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};


const deleteAllNotificationsAction = () => ({
    type: ActionTypes.DELETE_ALL_NOTIFICATIONS
});

export const deleteAllNotifications = (user_id) => (dispatch) => {
    const response = deleteData(ActionTypes.notificationsUrl(user_id), {}, {});

    response.then(
        () => {
            dispatch(deleteAllNotificationsAction());
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

//ADMIN
const fetchAdminNotificationsAction = (payload) => ({
    type: ActionTypes.FETCH_ADMIN_NOTIFICATIONS,
    payload: payload
});

export const fetchAdminNotifications = () => (dispatch) => {
    const response = fetchData(ActionTypes.notificationsAdminUrl(), {}, {});

    response.then(
        (res) => dispatch(fetchAdminNotificationsAction(res)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const createAdminNotificationsAction = (payload) => ({
    type: ActionTypes.CREATE_ADMIN_NOTIFICATIONS,
    payload: payload
});

export const createAdminNotifications = (payload) => (dispatch) => {
    const response = createData(ActionTypes.notificationsAdminUrl(), {}, payload);

    response.then(
        (res) => {
            dispatch(createAdminNotificationsAction(res.data));
            message.success("Success!");

        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const updateAdminNotificationsAction = (payload) => ({
    type: ActionTypes.UPDATE_ADMIN_NOTIFICATIONS,
    payload: payload
});

export const updateAdminNotifications = (note_id, payload) => (dispatch) => {
    const response = patchData(ActionTypes.notificationAdminUrl(note_id), {}, payload);

    response.then(
        (res) => {
            dispatch(updateAdminNotificationsAction(res));
            message.success("Success!");

        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const deleteAdminNotificationAction = (note_id) => ({
    type: ActionTypes.DELETE_ADMIN_NOTIFICATIONS,
    note_id
});

export const deleteAdminNotification = (note_id) => (dispatch) => {
    const response = deleteData(ActionTypes.notificationAdminUrl(note_id), {}, {});

    response.then(
        () => {
            message.success("Success!");
            dispatch(deleteAdminNotificationAction(note_id));
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};