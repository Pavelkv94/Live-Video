import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    schedulesList: [],
    currentSchedule: {}
};

export function schedulesReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_SCHEDULES:
            return { ...state, schedulesList: action.payload };
        case ActionTypes.FETCH_SCHEDULE:
            return { ...state, currentSchedule: action.payload };
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

const fetchScheduleAction = (payload) => ({
    type: ActionTypes.FETCH_SCHEDULE,
    payload: payload,
});

export const fetchSchedule = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.scheduleUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchScheduleAction(res.data)),
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
        },
        (err) => console.log(err)
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
        },
        (err) => console.log(err)
    );
};


export const deleteSchedule = (id, userId) => (dispatch) => {
    const response = deleteData(ActionTypes.scheduleUrl(id), {});

    response.then(
        () => {
            dispatch(fetchSchedules(userId));
        },
        (err) => console.log(err)
    );
};
