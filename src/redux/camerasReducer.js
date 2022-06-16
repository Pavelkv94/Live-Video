import { message } from "antd";
import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";
import { fetchBucket, fetchStorage } from "./storagesReducer.js";

const initialState = {
    camerasList: [],
    currentCamera: {},
    deleteCameraStatus: "",
    camerasSchedules: [],
    checkedCameraSchedule: {},
    unAssignScheduleStatus: "",
};

export function camerasReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_CAMERAS:
            return { ...state, camerasList: action.payload };
        case ActionTypes.FETCH_CAMERA:
            return { ...state, currentCamera: action.payload };
        case ActionTypes.DELETE_CAMERA:
            return { ...state, deleteCameraStatus: action.payload };
        case ActionTypes.FETCH_CAMERA_SCHEDULES:
            return { ...state, camerasSchedules: action.payload };
        case ActionTypes.FETCH_CAMERA_SCHEDULE:
            return { ...state, checkedCameraSchedule: action.payload };
        case ActionTypes.DELETE_CAMERA_SCHEDULE:
            return { ...state, unAssignScheduleStatus: action.payload };
        default:
            return state;
    }
}

//CAMERAS
const fetchCamerasAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERAS,
    payload: payload,
});

export const fetchCameras = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.camerasAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchCamerasAction(res.data)),
        (err) => console.log(err.response.data)
    );
};

const fetchCameraAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERA,
    payload: payload,
});

export const fetchCamera = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.camerasUrl(id), {}, {});

    response
        .then(
            (res) => dispatch(fetchCameraAction(res.data)),
            (err) => console.log(err.response.data)
        )
        .then(
            (res) => {
                dispatch(fetchStorage(res.payload.storage_id));
                dispatch(fetchBucket(res.payload.bucket_id));
            },
            (err) => console.log(err.response.data)
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
            message.success("Success!");
        },
        (err) =>
            message.error(
                err.response.data ? err.response.data.data.message : "Error"
            )
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
            message.success("Success!");
        },
        (err) =>
            message.error(
                err.response.data ? err.response.data.data.message : "Error"
            )
    );
};

export const deleteCameraAction = (status) => ({
    type: ActionTypes.DELETE_CAMERA,
    payload: status,
});

export const deleteCamera = (id, userId) => (dispatch) => {
    deleteCameraAction("pending");
    const response = deleteData(ActionTypes.camerasUrl(id), {});

    response.then(
        (res) => {
            dispatch(deleteCameraAction("fulfilled"));
            dispatch(fetchCameras(userId));
            message.success("Success!");
        },
        (err) => {
            dispatch(deleteCameraAction("rejected"));
            message.error(
                err.response.data ? err.response.data.data.message : "Error"
            );
        }
    );
};

//CAMERAS SCHEDULE

const fetchCameraSchedulesAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERA_SCHEDULES,
    payload: payload,
});

export const fetchCameraSchedules = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.cameraSchedulesAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchCameraSchedulesAction(res.data)),
        (err) => console.log(err.response.data)
    );
};

const fetchCameraScheduleAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERA_SCHEDULE,
    payload: payload,
});

export const fetchCameraSchedule = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.cameraScheduleUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchCameraScheduleAction(res.data)),
        (err) => console.log(err.response.data)
    );
};

const asignCameraScheduleAction = (payload) => ({
    type: ActionTypes.ASSIGN_CAMERA_SCHEDULE,
    payload,
});

export const asignCameraSchedule = (cameraId, scheduleId) => (dispatch) => {
    const response = createData(
        ActionTypes.cameraScheduleUrl(cameraId, scheduleId),
        {},
        {}
    );

    response.then(
        (res) => {
            dispatch(asignCameraScheduleAction(res.data));
            // dispatch(fetchCameras(id));
            message.success("Success!");
        },
        (err) =>
            message.error(
                err.response.data ? err.response.data.data.message : "Error"
            )
    );
};

export const unAssignCameraScheduleAction = (status) => ({
    type: ActionTypes.DELETE_CAMERA_SCHEDULE,
    payload: status,
});

export const unAssignCameraSchedule = (cameraId, scheduleId) => (dispatch) => {
    // deleteCameraAction("pending");
    const response = deleteData(
        ActionTypes.cameraScheduleUrl(cameraId, scheduleId),
        {}
    );

    response.then(
        (res) => {
            dispatch(unAssignCameraScheduleAction("fulfilled"));
            dispatch(fetchCameraSchedules(cameraId));
            message.success("Success!");
        },
        (err) =>  message.error(
                err.response.data ? err.response.data.data.message : "Error"
            )//dispatch(unAssignCameraScheduleAction("rejected"))
    );
};
