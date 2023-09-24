import { message } from "antd";
import { createData, createWithFile, deleteData, fetchData, patchData, updateWithFile } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    monitoringObjectsList: [],
    sharedMonitoringObjectsList: [],
    monitoringObject: null,
    monitoringObjectCameras: [],
    monitoringObjectTrackers: []
};

export function monitoringObjectsReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_MONITORING_OBJECTS:
        return { ...state, monitoringObjectsList: action.payload };
    case ActionTypes.FETCH_MONITORING_OBJECT:
        return { ...state, monitoringObject: action.payload };
    case ActionTypes.CREATE_MONITORING_OBJECT:
        return { ...state, monitoringObjectsList: [...state.monitoringObjectsList, action.payload] };
    case ActionTypes.UPDATE_MONITORING_OBJECT:
        return { ...state, monitoringObject: action.payload };
    case ActionTypes.DELETE_MONITORING_OBJECT:
        return { ...state, monitoringObject: null,  monitoringObjectsList: state.monitoringObjectsList.filter(el => el.id !== +action.obj_id)};
        
    case ActionTypes.RESET_MONITORING_OBJECT:
        return { ...state, monitoringObject: null };

    case ActionTypes.FETCH_SHARED_MONITORING_OBJECTS:
        return { ...state, sharedMonitoringObjectsList: action.payload };
    case ActionTypes.DELETE_SHARED_MONITORING_OBJECTS:
        return {
            ...state,
            monitoringObject: { ...state.monitoringObject, shared_to: state.monitoringObject.shared_to.filter((el) => el.id !== action.obj_id) }
        };
    case ActionTypes.ADD_SHARED_USER:
        return { ...state, monitoringObject: action.payload };
    case ActionTypes.CHANGE_ACCESS_LEVEL:
        return {
            ...state,
            monitoringObject: {
                ...state.monitoringObject,
                shared_to: state.monitoringObject.shared_to.map((el) =>
                    el.id === action.payload.id ? action.payload : el
                )
            }
        };
    case ActionTypes.FETCH_MONITORING_OBJECT_CAMERAS:
        return { ...state, monitoringObjectCameras: action.payload };
    case ActionTypes.CREATE_MONITORING_OBJECT_CAMERAS:
        return { ...state, monitoringObjectCameras: [...state.monitoringObjectCameras, action.payload] };
    case ActionTypes.ASSIGN_MONITORING_OBJECT_CAMERAS:
        return { ...state, monitoringObjectCameras: [...state.monitoringObjectCameras, action.payload] };
    case ActionTypes.UNASSIGN_MONITORING_OBJECT_CAMERAS:
        return { ...state, monitoringObjectCameras: state.monitoringObjectCameras.filter((el) => el.id !== action.cam_id) };
    case ActionTypes.FETCH_MONITORING_OBJECT_TRACKERS:
        return { ...state, monitoringObjectTrackers: action.payload.map((el) => ({ ...el, isVisibleOnMap: true })) };
    case ActionTypes.CREATE_MONITORING_OBJECT_TRACKERS:
        return { ...state, monitoringObjectTrackers: [...state.monitoringObjectTrackers, action.payload] };
    case ActionTypes.ASSIGN_MONITORING_OBJECT_TRACKER:
        return { ...state, monitoringObjectTrackers: [...state.monitoringObjectTrackers, { ...action.payload, isVisibleOnMap: true }] };
    case ActionTypes.UNASSIGN_MONITORING_OBJECT_TRACKER:
        return { ...state, monitoringObjectTrackers: state.monitoringObjectTrackers.filter((el) => el.trobject_id !== action.tr_id) };
    case ActionTypes.CHANGE_MONITORING_TRACKER_VISIBLE:
        return {
            ...state,
            monitoringObjectTrackers: state.monitoringObjectTrackers.map((el) =>
                el.trobject_id === action.tracker_id ? { ...el, isVisibleOnMap: action.isVisible } : el
            )
        };
    default:
        return state;
    }
}

const fetchMonitoringObjectsAction = (payload) => ({
    type: ActionTypes.FETCH_MONITORING_OBJECTS,
    payload
});

export const fetchMonitoringObjects = (user_id) => (dispatch) => {
    const response = fetchData(ActionTypes.monitoringObjectsAllUrl(user_id), {}, {});

    response.then(
        (res) => dispatch(fetchMonitoringObjectsAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const fetchMonitoringObjectAction = (payload) => ({
    type: ActionTypes.FETCH_MONITORING_OBJECT,
    payload
});

export const fetchMonitoringObject = (obj_id) => (dispatch) => {
    const response = fetchData(ActionTypes.monitoringObjectUrl(obj_id), {}, {});

    response.then(
        (res) => dispatch(fetchMonitoringObjectAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const createMonitoringObjectAction = (payload) => ({
    type: ActionTypes.CREATE_MONITORING_OBJECT,
    payload
});

export const createMonitoringObject = (user_id, payload) => (dispatch) => {

    const response = createWithFile(ActionTypes.monitoringObjectsAllUrl(user_id), {}, payload);
    response.then(
        (res) => {
            dispatch(createMonitoringObjectAction(res));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const updateMonitoringObjectAction = (payload) => ({
    type: ActionTypes.UPDATE_MONITORING_OBJECT,
    payload
});

export const updateMonitoringObject = (obj_id, paylaod) => (dispatch) => {
    const response = patchData(ActionTypes.monitoringObjectUrl(obj_id), {}, paylaod);

    response.then(
        (res) => {
            dispatch(updateMonitoringObjectAction(res));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

export const updateMonitoringObjectImage = (obj_id, paylaod) => (dispatch) => {
    const response = updateWithFile(ActionTypes.monitoringObjectUrl(obj_id), {}, paylaod);

    response.then(
        (res) => {
            dispatch(updateMonitoringObjectAction(res));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};


export const resetMonitoringObjectAction = (payload) => ({
    type: ActionTypes.RESET_MONITORING_OBJECT,
    payload
});


const deleteMonitoringObjectAction = (obj_id) => ({
    type: ActionTypes.DELETE_MONITORING_OBJECT,
    obj_id
});

export const deleteMonitoringObject = (obj_id) => (dispatch) => {
    const response = deleteData(ActionTypes.monitoringObjectUrl(obj_id), {}, {});

    response.then(
        () => {
            dispatch(deleteMonitoringObjectAction(obj_id));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

//SHARED
const fetchSharedMonitoringObjectsAction = (payload) => ({
    type: ActionTypes.FETCH_SHARED_MONITORING_OBJECTS,
    payload
});

export const fetchSharedMonitoringObjects = (user_id) => (dispatch) => {
    const response = fetchData(ActionTypes.sharedMonitoringObjectUrl(user_id), {}, {});

    response.then(
        (res) => dispatch(fetchSharedMonitoringObjectsAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const addSharedUserAction = (payload) => ({
    type: ActionTypes.ADD_SHARED_USER,
    payload
});

export const addSharedUser = (obj_id, paylaod) => (dispatch) => {
    const response = createData(ActionTypes.sharedUserUrl(obj_id), {}, paylaod);

    response.then(
        (res) => {
            dispatch(addSharedUserAction(res.data));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const changeAccessLevelAction = (payload) => ({
    type: ActionTypes.CHANGE_ACCESS_LEVEL,
    payload
});

export const changeAccessLevel = (obj_id, paylaod) => (dispatch) => {
    const response = patchData(ActionTypes.sharingsUrl(obj_id), {}, paylaod);

    response.then(
        (res) => {
            dispatch(changeAccessLevelAction(res));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const deleteSharedMonitoringObjectsAction = (obj_id) => ({
    type: ActionTypes.DELETE_SHARED_MONITORING_OBJECTS,
    obj_id
});

export const deleteSharedMonitoringObjects = (obj_id) => (dispatch) => {
    const response = deleteData(ActionTypes.sharingsUrl(obj_id), {}, {});

    response.then(
        () => dispatch(deleteSharedMonitoringObjectsAction(obj_id)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

//MONITORING OBJECT CAMERAS
const fetchMonitoringObjectCamerasAction = (payload) => ({
    type: ActionTypes.FETCH_MONITORING_OBJECT_CAMERAS,
    payload
});

export const fetchMonitoringObjectCameras = (obj_id) => (dispatch) => {
    const response = fetchData(ActionTypes.monitoringObjectCamerasUrl(obj_id), {}, {});

    response.then(
        (res) => dispatch(fetchMonitoringObjectCamerasAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const createMonitoringObjectCamerasAction = (payload) => ({
    type: ActionTypes.CREATE_MONITORING_OBJECT_CAMERAS,
    payload
});

export const createMonitoringObjectCameras = (obj_id, payload) => (dispatch) => {
    const response = createData(ActionTypes.monitoringObjectCamerasUrl(obj_id), {}, payload);

    response.then(
        (res) => {
            dispatch(createMonitoringObjectCamerasAction(res.data));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const assignMonitoringObjectCamerasAction = (payload) => ({
    type: ActionTypes.ASSIGN_MONITORING_OBJECT_CAMERAS,
    payload
});

export const assignMonitoringObjectCameras = (obj_id, cam_id) => (dispatch) => {
    const response = createData(ActionTypes.monitoringObjectAssignCamerasUrl(obj_id, cam_id), {}, {});

    response.then(
        (res) => {
            dispatch(assignMonitoringObjectCamerasAction(res.data));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const unassignMonitoringObjectCamerasAction = (cam_id) => ({
    type: ActionTypes.UNASSIGN_MONITORING_OBJECT_CAMERAS,
    cam_id
});

export const unassignMonitoringObjectCameras = (obj_id, cam_id) => (dispatch) => {
    const response = deleteData(ActionTypes.monitoringObjectAssignCamerasUrl(obj_id, cam_id), {}, {});

    response.then(
        () => {
            dispatch(unassignMonitoringObjectCamerasAction(cam_id));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

//MONITORING OBJECT TRACKERS

const assignMonitoringObjectTrackerAction = (payload) => ({
    type: ActionTypes.ASSIGN_MONITORING_OBJECT_TRACKER,
    payload
});

export const assignMonitoringObjectTracker = (obj_id, tr_id) => (dispatch) => {
    const response = createData(ActionTypes.monitoringObjectAssignTrackersUrl(obj_id, tr_id), {}, {});

    response.then(
        (res) => {
            dispatch(assignMonitoringObjectTrackerAction(res));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const unassignMonitoringObjectTrackerAction = (tr_id) => ({
    type: ActionTypes.UNASSIGN_MONITORING_OBJECT_TRACKER,
    tr_id
});

export const unassignMonitoringObjectTracker = (obj_id, tr_id) => (dispatch) => {
    const response = deleteData(ActionTypes.monitoringObjectAssignTrackersUrl(obj_id, tr_id), {}, {});

    response.then(
        () => {
            dispatch(unassignMonitoringObjectTrackerAction(tr_id));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const fetchMonitoringObjectTrackersAction = (payload) => ({
    type: ActionTypes.FETCH_MONITORING_OBJECT_TRACKERS,
    payload
});

export const fetchMonitoringObjectTrackers = (obj_id) => (dispatch) => {
    const response = fetchData(ActionTypes.monitoringObjectTrackersUrl(obj_id), {}, {});

    response.then(
        (res) => dispatch(fetchMonitoringObjectTrackersAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const createMonitoringObjectTrackersAction = (payload) => ({
    type: ActionTypes.CREATE_MONITORING_OBJECT_TRACKERS,
    payload
});

export const createMonitoringObjectTrackers = (obj_id, payload) => (dispatch) => {
    const response = createData(ActionTypes.monitoringObjectTrackersUrl(obj_id), {}, payload);

    response.then(
        (res) => {
            dispatch(createMonitoringObjectTrackersAction(res.data));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

export const changeMonitoringTrackerVisibleAC = (tracker_id, isVisible) => ({
    type: ActionTypes.CHANGE_MONITORING_TRACKER_VISIBLE,
    tracker_id,
    isVisible
});
