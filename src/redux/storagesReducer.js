import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    storagesList: [],
    currentStorage: {},
    bucketsList: [],
    currentBucket: {},
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
    payload: payload,
});

export const fetchStorages = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.storagesAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchStoragesAction(res.data)),
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

//BUCKETS
export const fetchBucketsAction = (payload) => ({
    type: ActionTypes.FETCH_BUCKETS,
    payload: payload,
});

export const fetchBuckets = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.bucketsAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchBucketsAction(res.data)),
        (err) => console.log(err)
    );
};

const fetchBucketAction = (payload) => ({
    type: ActionTypes.FETCH_BUCKET,
    payload: payload,
});

export const fetchBucket = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.bucketUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchBucketAction(res.data)),
        (err) => console.log(err)
    );
};

const createBucketAction = (payload) => ({
    type: ActionTypes.CREATE_BUCKET,
    payload,
});

export const createBucket = (payload, id) => (dispatch) => {
    const response = createData(ActionTypes.bucketsAllUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(createBucketAction(res.data));
            dispatch(fetchBuckets(id));
        },
        (err) => console.log(err)
    );
};

const updateBucketAction = (payload) => ({
    type: ActionTypes.UPDATE_BUCKET,
    payload,
});

export const updateBucket = (payload, id, userId) => (dispatch) => {
    const response = updateData(ActionTypes.bucketUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(updateBucketAction(res.data));
            dispatch(fetchBuckets(userId));
        },
        (err) => console.log(err)
    );
};

export const deleteBucket = (id, userId) => (dispatch) => {
    const response = deleteData(ActionTypes.bucketUrl(id), {});

    response.then(
        () => {
            dispatch(fetchBuckets(userId));
        },
        (err) => console.log(err)
    );
};
