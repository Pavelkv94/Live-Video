import { message, notification } from "antd";
import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";
import { fetchCameraSchedules } from "./camerasReducer.js";

const initialState = {
    schedulesList: [],
    currentSchedule: {},
    assignedCameras: []
};

export function schedulesReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_SCHEDULES:
        return { ...state, schedulesList: action.payload };
    case ActionTypes.FETCH_SCHEDULE:
        return { ...state, currentSchedule: action.payload };
    case ActionTypes.UPDATE_SCHEDULE:
        return { ...state, currentSchedule: action.payload };
        
    case ActionTypes.FETCH_ASSIGN_CAMERAS:
        return { ...state, assignedCameras: action.payload };
    default:
        return state;
    }
}

const fetchSchedulesAction = (payload) => ({
    type: ActionTypes.FETCH_SCHEDULES,
    payload: payload
});

export const fetchSchedules = () => (dispatch) => {
    const response = fetchData(ActionTypes.schedulesAllUrl(), {}, {});

    response.then(
        (res) => dispatch(fetchSchedulesAction(res.schedules)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const fetchAssignedCamerasAction = (payload) => ({
    type: ActionTypes.FETCH_ASSIGN_CAMERAS,
    payload: payload
});

export const fetchAssignedCameras = (scheduleId) => (dispatch) => {
    const response = fetchData(ActionTypes.assignedCamerasUrl(scheduleId), {}, {});

    response.then(
        (res) => dispatch(fetchAssignedCamerasAction(res.cameras)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const assignSchedulesToCamAction = (payload) => ({
    type: ActionTypes.IS_ENABLE_SCHEDULE,
    payload: payload
});

export const assignScheduleToCam = (cameraId, scheduleId, payload) => (dispatch) => {
    const response = updateData(ActionTypes.assignedCamerasUrl(scheduleId), {}, payload);

    response.then(
        (res) => {
            if (res.data.errors < 1 || !res.data.errors) {
                dispatch(assignSchedulesToCamAction(res.data));
                dispatch(fetchAssignedCameras(scheduleId));
                dispatch(fetchCameraSchedules(cameraId));
                message.success("Success!");
            } else {
                res.data.errors.map((el) =>
                    notification.open({
                        message: "Notification Title",
                        description: `${el.message}: ${el.cameras.map((e) => e.test).join(", ")}`
                    })
                );
            }
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const fetchScheduleAction = (payload) => ({
    type: ActionTypes.FETCH_SCHEDULE,
    payload: payload
});

export const fetchSchedule = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.scheduleUrl(id), {}, {});

    response.then(
        (res) => {
            dispatch(fetchScheduleAction(res.schedule));
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const createScheduleAction = (payload) => ({
    type: ActionTypes.CREATE_SCHEDULE,
    payload
});

export const createSchedule = (payload) => (dispatch) => {
    const response = createData(ActionTypes.schedulesAllUrl(), {}, payload);

    response.then(
        (res) => {
            dispatch(createScheduleAction(res.data));
            dispatch(fetchSchedules());
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const updateScheduleAction = (payload) => ({
    type: ActionTypes.UPDATE_SCHEDULE,
    payload
});

export const updateSchedule = (payload, id) => (dispatch) => {
    const response = updateData(ActionTypes.scheduleUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(updateScheduleAction(res.schedule));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

export const deleteSchedule = (schedule_id) => (dispatch) => {
    const response = deleteData(ActionTypes.scheduleUrl(schedule_id), {});

    response.then(
        () => {
            dispatch(fetchSchedules());
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};
