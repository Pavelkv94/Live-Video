import { message } from "antd";
import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";
import { fetchAssignedCameras } from "./schedulesReducer.js";
import { fetchBucket, fetchStorage } from "./storagesReducer.js";

const initialState = {
    camerasList: [],
    currentCamera: {},
    cameraSharings: [],
    deleteCameraStatus: "",
    camerasSchedules: [],
    checkedCameraSchedule: {},
    unAssignScheduleStatus: ""
};

export function camerasReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_CAMERAS:
        return { ...state, camerasList: action.payload };
    case ActionTypes.FETCH_CAMERA:
        return { ...state, currentCamera: action.payload };
    case ActionTypes.CREATE_CAMERA:
        return { ...state, camerasList: [action.payload, ...state.camerasList ] };
    case ActionTypes.UPDATE_CAMERA:
        return { ...state, currentCamera: action.payload };
    case ActionTypes.DELETE_CAMERA:
        return { ...state, deleteCameraStatus: action.status };
    case ActionTypes.FETCH_CAMERA_SCHEDULES:
        return { ...state, camerasSchedules: action.payload };
    case ActionTypes.FETCH_CAMERA_SCHEDULE:
        return { ...state, checkedCameraSchedule: action.payload };
    case ActionTypes.DELETE_CAMERA_SCHEDULE:
        return { ...state, unAssignScheduleStatus: action.payload };
        
    case ActionTypes.FETCH_CAMERA_SHARINGS:
        return { ...state, cameraSharings: action.payload };
    case ActionTypes.ADD_CAMERA_SHARING:
        return { ...state, cameraSharings:  [...state.cameraSharings, action.payload]};

        // case ActionTypes.UPDATE_CAMERA_SHARING:
        //     return {
        //         ...state,
        //         currentCamera: 
        //             {...state.currentCamera, shared_to: state.currentCamera.shared_to
        //                 .map(item => item.id === action.payload.id ? action.payload : item)} };
        
    case ActionTypes.DELETE_CAMERA_SHARING:
        return { ...state, cameraSharings: state.cameraSharings.filter(el => el.id !== action.sharing_id)};
        
    default:
        return state;
    }
}

//CAMERAS
const fetchCamerasAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERAS,
    payload: payload
});

export const fetchCameras = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.camerasAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchCamerasAction(res)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const fetchCameraAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERA,
    payload: payload
});

export const fetchCamera = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.camerasUrl(id), {}, {});

    response
        .then(
            (res) => dispatch(fetchCameraAction(res)),
            (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
        )
        .then(
            (res) => {
                dispatch(fetchStorage(res.payload.storage_id));
                dispatch(fetchBucket(res.payload.bucket_id));
            },
            (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
        );
};

const createCameraAction = (payload) => ({
    type: ActionTypes.CREATE_CAMERA,
    payload
});

export const createCamera = (payload, id) => (dispatch) => {
    const response = createData(ActionTypes.camerasAllUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(createCameraAction(res.data.camera));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const updateCameraAction = (payload) => ({
    type: ActionTypes.UPDATE_CAMERA,
    payload
});

export const updateCamera = (payload, cameraId) => (dispatch) => {
    const response = updateData(ActionTypes.camerasUrl(cameraId), {}, payload);

    response.then(
        (res) => {
            dispatch(updateCameraAction(res.camera));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

export const deleteCameraAction = (status) => ({
    type: ActionTypes.DELETE_CAMERA,
    status
});

export const deleteCamera = (id) => (dispatch) => {
    deleteCameraAction("pending");
    const response = deleteData(ActionTypes.camerasUrl(id), {});

    response.then(
        () => {
            dispatch(deleteCameraAction("fulfilled"));
            dispatch(fetchCameras());
            message.success("Success!");
        },
        (err) => {
            dispatch(deleteCameraAction("rejected"));
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
        }
    );
};

//CAMERAS SCHEDULE

const fetchCameraSchedulesAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERA_SCHEDULES,
    payload: payload
});

export const fetchCameraSchedules = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.cameraSchedulesAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchCameraSchedulesAction(res.schedules)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const fetchCameraScheduleAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERA_SCHEDULE,
    payload: payload
});

export const fetchCameraSchedule = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.cameraScheduleUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchCameraScheduleAction(res.data)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const asignCameraScheduleAction = (payload) => ({
    type: ActionTypes.ASSIGN_CAMERA_SCHEDULE,
    payload
});

export const asignCameraSchedule = (cameraId, scheduleId) => (dispatch) => {
    const response = createData(ActionTypes.cameraScheduleUrl(cameraId, scheduleId), {}, {});

    response.then(
        (res) => {
            dispatch(asignCameraScheduleAction(res.data));
            dispatch(fetchAssignedCameras(scheduleId));
            dispatch(fetchCameraSchedules(cameraId));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

export const unAssignCameraScheduleAction = (status) => ({
    type: ActionTypes.DELETE_CAMERA_SCHEDULE,
    payload: status
});

export const unAssignCameraSchedule = (cameraId, scheduleId) => (dispatch) => {
    // deleteCameraAction("pending");
    const response = deleteData(ActionTypes.cameraScheduleUrl(cameraId, scheduleId), {});

    response.then(
        () => {
            // dispatch(unAssignCameraScheduleAction("fulfilled"));
            dispatch(fetchCameraSchedules(cameraId));
            dispatch(fetchAssignedCameras(scheduleId));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

//CAMERA SHARINGS
const fetchCameraSharingsAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERA_SHARINGS,
    payload
});

export const fetchCameraSharings = (cam_id) => (dispatch) => {
    const response = fetchData(ActionTypes.cameraSharingUrl(cam_id), {}, {});

    response.then(
        (res) => {
            dispatch(fetchCameraSharingsAction(res));
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const addCameraSharingAction = (payload) => ({
    type: ActionTypes.ADD_CAMERA_SHARING,
    payload
});

export const addCameraSharing = (cam_id, payload) => (dispatch) => {
    const response = createData(ActionTypes.cameraSharingUrl(cam_id), {}, payload);

    response.then(
        (res) => {
            dispatch(addCameraSharingAction(res.data));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

// const updateCameraSharingAction = (payload) => ({
//     type: ActionTypes.UPDATE_CAMERA_SHARING,
//     payload
// });

// export const updateCameraSharing = (payload, sharing_id) => (dispatch) => {
//     const response = patchData(ActionTypes.cameraSharingUrl(sharing_id), {}, payload);

//     response.then(
//         (res) => {
//             dispatch(updateCameraSharingAction(res));
//             message.success("Success!");
//         },
//         (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
//     );
// };

export const deleteCameraSharingAction = (sharing_id) => ({
    type: ActionTypes.DELETE_CAMERA_SHARING,
    sharing_id
});

export const deleteCameraSharing = (cam_id, sharing_id) => (dispatch) => {
    deleteCameraAction("pending");
    const response = deleteData(ActionTypes.cameraSharingUpdateUrl(cam_id, sharing_id), {});

    response.then(
        () => {
            dispatch(deleteCameraSharingAction(sharing_id));
            message.success("Success!");
        },
        (err) => {
            dispatch(deleteCameraAction("rejected"));
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
        }
    );
};