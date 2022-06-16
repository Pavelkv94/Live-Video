import { message } from "antd";
import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    schedulesList: [],
    currentSchedule: {},
    assignedCameras: [],
};

export function schedulesReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_SCHEDULES:
            return { ...state, schedulesList: action.payload };
        case ActionTypes.FETCH_SCHEDULE:
            return { ...state, currentSchedule: action.payload };
        case ActionTypes.FETCH_ASSIGN_CAMERAS:
            return { ...state, assignedCameras: action.payload };
        default:
            return state;
    }
}

const fetchSchedulesAction = (payload) => ({
    type: ActionTypes.FETCH_SCHEDULES,
    payload: payload,
});

export const fetchSchedules = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.schedulesAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchSchedulesAction(res.data)),
        (err) => console.log(err)
    );
};

const fetchAssignedCamerasAction = (payload) => ({
    type: ActionTypes.FETCH_ASSIGN_CAMERAS,
    payload: payload,
});

export const fetchAssignedCameras = (scheduleId) => (dispatch) => {
    const response = fetchData(ActionTypes.assignedCamerasUrl(scheduleId), {}, {});

    response.then(
        (res) => dispatch(fetchAssignedCamerasAction(res.data)),
        (err) => console.log(err)
    );
};

const assignSchedulesToCamAction = (payload) => ({
    type: ActionTypes.IS_ENABLE_SCHEDULE,
    payload: payload,
});

export const assignScheduleToCam = (scheduleId, payload) => (dispatch) => {
    const response = updateData(
        ActionTypes.assignedCamerasUrl(scheduleId),
        {},
        payload
    );

    response.then(
        (res) => {
            dispatch(assignSchedulesToCamAction(res.data));
            dispatch(fetchAssignedCameras(scheduleId));
            message.success("Success!");
        },
        (err) => console.log(err)
    );
};

const fetchScheduleAction = (payload) => ({
    type: ActionTypes.FETCH_SCHEDULE,
    payload: payload,
});

export const fetchSchedule = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.scheduleUrl(id), {}, {});

    response.then(
        (res) => {
            dispatch(fetchScheduleAction(res.data));
        },
        (err) => console.log(err)
    );
};

const createScheduleAction = (payload) => ({
    type: ActionTypes.CREATE_SCHEDULE,
    payload,
});

export const createSchedule = (payload, id) => (dispatch) => {
    const response = createData(ActionTypes.schedulesAllUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(createScheduleAction(res.data));
            dispatch(fetchSchedules(id));
            message.success("Success!");
        },
        (err) =>
            message.error(
                err.response.data ? err.response.data.data.message : "Error"
            )
    );
};

const updateScheduleAction = (payload) => ({
    type: ActionTypes.UPDATE_SCHEDULE,
    payload,
});

export const updateSchedule = (payload, id, userId) => (dispatch) => {
    const response = updateData(ActionTypes.scheduleUrl(id), {}, payload);

    response.then(
        (res) => {
            dispatch(updateScheduleAction(res.data));
            dispatch(fetchSchedules(userId));
            message.success("Success!");
        },
        (err) =>
            message.error(
                err.response.data ? err.response.data.data.message : "Error"
            )
    );
};

export const deleteSchedule = (id, userId) => (dispatch) => {
    const response = deleteData(ActionTypes.scheduleUrl(id), {});

    response.then(
        () => {
            dispatch(fetchSchedules(userId));
            message.success("Success!");
        },
        (err) =>
            message.error(
                err.response.data ? err.response.data.data.message : "Error"
            )
    );
};
