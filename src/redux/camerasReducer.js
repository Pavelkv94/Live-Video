import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    camerasList: [],
};

export function camerasReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_CAMERAS:
            return { ...state, camerasList: action.payload };
        default:
            return state;
    }
}

const fetchCamerasAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERAS,
    payload: payload,
});

export const fetchCameras = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.userUrl(id), {}, {}, "cameras");

    response.then(
        (res) => dispatch(fetchCamerasAction(res.data)),
        (err) => console.log(err)
    );
};

const createCameraAction = (payload) => ({
    type: ActionTypes.CREATE_CAMERA,
    payload,
});

export const createCamera = (payload, id) => (dispatch) => {
    const response = createData(ActionTypes.userUrl(id), {}, payload, 'cameras');

    response.then(
        (res) => {
            dispatch(createCameraAction(res.data));
            dispatch(fetchCameras(id))},
        (err) => console.log(err)
    );
};

const updateCameraAction = (payload) => ({
    type: ActionTypes.UPDATE_CAMERA,
    payload,
});

export const updateCamera = (payload, id) => (dispatch) => {
    const response = updateData(ActionTypes.userUrl(id), {}, payload, 'cameras');

    response.then(
        (res) => {
            dispatch(updateCameraAction(res.data));
            dispatch(fetchCameras(id));
        },
        (err) => console.log(err)
    );
};

// const deleteCameraAction = () => ({
//     type: ActionTypes.DELETE_CAMERA,
// });

export const deleteCamera = (id) => (dispatch) => {
    const response = deleteData(ActionTypes.camerasUrl(id), {});

    response.then(
        (res) => {
            dispatch(fetchCameras(id));
        },
        (err) => console.log(err)
    );
};