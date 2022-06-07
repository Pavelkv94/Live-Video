import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    storagesList: [],
    currentStorage: {}
};

export function storagesReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_STORAGES:
            return { ...state, storagesList: action.payload };
        case ActionTypes.FETCH_STORAGE:
            return { ...state, currentStorage: action.payload };
        default:
            return state;
    }
}

const fetchStoragesAction = (payload) => ({
    type: ActionTypes.FETCH_STORAGES,
    payload: payload,
});

export const fetchStorages = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.storagesAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchStoragesAction(res.data.reverse())),
        (err) => console.log(err)
    );
};

const fetchStorageAction = (payload) => ({
    type: ActionTypes.FETCH_STORAGE,
    payload: payload,
});

export const fetchStorage = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.storageUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchStorageAction(res.data)),
        (err) => console.log(err)
    );
};

const createStorageAction = (payload) => ({
    type: ActionTypes.CREATE_STORAGE,
    payload,
});

export const createStorage = (payload, id) => (dispatch) => {
    const response = createData(ActionTypes.storagesAllUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(createStorageAction(res.data));
            dispatch(fetchStorages(id));
        },
        (err) => console.log(err)
    );
};

const updateStorageAction = (payload) => ({
    type: ActionTypes.UPDATE_STORAGE,
    payload,
});

export const updateStorage = (payload, id, userId) => (dispatch) => {
    const response = updateData(ActionTypes.storageUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(updateStorageAction(res.data));
            dispatch(fetchStorages(userId));
        },
        (err) => console.log(err)
    );
};


export const deleteStorage = (id, userId) => (dispatch) => {
    const response = deleteData(ActionTypes.storageUrl(id), {});

    response.then(
        () => {
            dispatch(fetchStorages(userId));
        },
        (err) => console.log(err)
    );
};
