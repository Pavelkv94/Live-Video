import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    camerasList: [],
    currentCamera: {},
    deleteCameraStatus: '',
    camerasSchedules: [],
    checkedCameraSchedule: {}
};

export function camerasReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_CAMERAS:
            return { ...state, camerasList: action.payload };
        case ActionTypes.FETCH_CAMERA:
            return { ...state, currentCamera: action.payload };
        case ActionTypes.DELETE_CAMERA:
            return { ...state, deleteCameraStatus: action.payload };
        default:
            return state;
    }
}

const fetchCamerasAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERAS,
    payload: payload,
});

export const fetchCameras = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.camerasAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchCamerasAction(res.data)),
        (err) => console.log(err)
    );
};

const fetchCameraAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERA,
    payload: payload,
});

export const fetchCamera = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.camerasUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchCameraAction(res.data)),
        (err) => console.log(err)
    );
};

const createCameraAction = (payload) => ({
    type: ActionTypes.CREATE_CAMERA,
    payload,
});

export const createCamera = (payload, id) => (dispatch) => {
    const response = createData(ActionTypes.camerasAllUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(createCameraAction(res.data));
            dispatch(fetchCameras(id));
        },
        (err) => console.log(err)
    );
};

const updateCameraAction = (payload) => ({
    type: ActionTypes.UPDATE_CAMERA,
    payload,
});

export const updateCamera = (payload, id, userId) => (dispatch) => {
    const response = updateData(ActionTypes.camerasUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(updateCameraAction(res.data));
            dispatch(fetchCameras(userId));
        },
        (err) => console.log(err)
    );
};

export const deleteCameraAction = (status) => ({
    type: ActionTypes.DELETE_CAMERA,
    payload: status
});

export const deleteCamera = (id, userId) => (dispatch) => {
    deleteCameraAction('pending')
    const response = deleteData(ActionTypes.camerasUrl(id), {});

    response.then(
        (res) => {
            dispatch(deleteCameraAction('fulfilled'))
            dispatch(fetchCameras(userId));
        },
        (err) => dispatch(deleteCameraAction('rejected'))

    );
};
