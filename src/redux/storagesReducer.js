import { message } from "antd";
import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    storagesList: [],
    currentStorage: {},
    bucketsList: [],
    currentBucket: {}
};

export function storagesReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_STORAGES:
        return { ...state, storagesList: action.payload };
    case ActionTypes.FETCH_STORAGE:
        return { ...state, currentStorage: action.payload };
    case ActionTypes.FETCH_BUCKETS:
        return { ...state, bucketsList: action.payload };
    case ActionTypes.FETCH_BUCKET:
        return { ...state, currentBucket: action.payload };
    default:
        return state;
    }
}

//STORAGES
const fetchStoragesAction = (payload) => ({
    type: ActionTypes.FETCH_STORAGES,
    payload: payload
});

export const fetchStorages = () => (dispatch) => {
    const response = fetchData(ActionTypes.storagesAllUrl(), {}, {});

    response.then(
        (res) => dispatch(fetchStoragesAction(res.storages)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const fetchStorageAction = (payload) => ({
    type: ActionTypes.FETCH_STORAGE,
    payload: payload
});

export const fetchStorage = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.storageUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchStorageAction(res.storage)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const createStorageAction = (payload) => ({
    type: ActionTypes.CREATE_STORAGE,
    payload
});

export const createStorage = (payload) => (dispatch) => {
    const response = createData(ActionTypes.storagesAllUrl(), {}, payload);

    response.then(
        (res) => {
            dispatch(createStorageAction(res.data));
            dispatch(fetchStorages());
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const updateStorageAction = (payload) => ({
    type: ActionTypes.UPDATE_STORAGE,
    payload
});

export const updateStorage = (payload, id, userId) => (dispatch) => {
    const response = updateData(ActionTypes.storageUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(updateStorageAction(res.data));
            dispatch(fetchStorages(userId));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

export const deleteStorage = (storage_id) => (dispatch) => {
    const response = deleteData(ActionTypes.storageUrl(storage_id), {});

    response.then(
        () => {
            dispatch(fetchStorages());
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

//BUCKETS
export const fetchBucketsAction = (payload) => ({
    type: ActionTypes.FETCH_BUCKETS,
    payload: payload
});

export const fetchBuckets = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.bucketsAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchBucketsAction(res.buckets)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const fetchBucketAction = (payload) => ({
    type: ActionTypes.FETCH_BUCKET,
    payload: payload
});

export const fetchBucket = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.bucketUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchBucketAction(res.data)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const createBucketAction = (payload) => ({
    type: ActionTypes.CREATE_BUCKET,
    payload
});

export const createBucket = (payload, storageId) => (dispatch) => {
    const response = createData(ActionTypes.bucketsAllUrl(storageId), {}, payload);

    response.then(
        (res) => {
            dispatch(createBucketAction(res.data));
            dispatch(fetchBuckets(storageId));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const updateBucketAction = (payload) => ({
    type: ActionTypes.UPDATE_BUCKET,
    payload
});

export const updateBucket = (bucketId, storageId, payload) => (dispatch) => {
    const response = updateData(ActionTypes.bucketUrl(bucketId), {}, payload);

    response.then(
        (res) => {
            dispatch(updateBucketAction(res.data));
            dispatch(fetchBuckets(storageId));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

export const deleteBucket = (id, storageId) => (dispatch) => {
    const response = deleteData(ActionTypes.bucketUrl(id), {});

    response.then(
        () => {
            dispatch(fetchBuckets(storageId));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};
