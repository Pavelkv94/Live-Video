import { message } from "antd";
import { createData, fetchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    trackersTariffsList: [],
    camerasTariffsList: []
};

export function tariffsReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_TRACKERS_TARIFFS:
        return { ...state, trackersTariffsList: action.payload };
    case ActionTypes.CREATE_TRACKERS_TARIFF:
        return { ...state, trackersTariffsList: [...state.trackersTariffsList, action.payload] };

    case ActionTypes.FETCH_CAMERAS_TARIFFS:
        return { ...state, camerasTariffsList: action.payload };
    case ActionTypes.CREATE_CAMERAS_TARIFF:
        return { ...state, camerasTariffsList: [...state.camerasTariffsList, action.payload] };
    
    default:
        return state;
    }
}

const fetchTrackersTariffsAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKERS_TARIFFS,
    payload
});

export const fetchTrackersTariffs = () => (dispatch) => {
    const response = fetchData(ActionTypes.trackerTariffsUrl(), {}, {});

    response.then(
        (res) => dispatch(fetchTrackersTariffsAction(res)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const fetchCamerasTariffsAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERAS_TARIFFS,
    payload
});

export const fetchCamerasTariffs = () => (dispatch) => {
    const response = fetchData(ActionTypes.cameraTariffsUrl(), {}, {});

    response.then(
        (res) => dispatch(fetchCamerasTariffsAction(res)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const createTrackerTariffAction = (payload) => ({
    type: ActionTypes.CREATE_TRACKERS_TARIFF,
    payload
});

export const createTrackerTariff = (payload) => (dispatch) => {
    const response = createData(ActionTypes.trackerTariffsUrl(), {}, payload);

    response.then(
        (res) => {
            dispatch(createTrackerTariffAction(res.data.tariff));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const createCameraTariffAction = (payload) => ({
    type: ActionTypes.CREATE_CAMERAS_TARIFF,
    payload
});

export const createCameraTariff = (payload) => (dispatch) => {
    const response = createData(ActionTypes.cameraTariffsUrl(), {}, payload);

    response.then(
        (res) => {
            dispatch(createCameraTariffAction(res.data.tariff));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const createCameraTariffAndAssignAction = (payload) => ({
    type: ActionTypes.CREATE_CAMERA_TARIFF_AND_ASSIGN,
    payload
});

export const createCameraTariffAndAssign = (user_id, payload) => (dispatch) => {
    const response = createData(ActionTypes.cameraTariffsAssignUrl(user_id), {}, payload);

    response.then(
        (res) => dispatch(createCameraTariffAndAssignAction(res.data.tariff)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const createTariffAndAssignAction = (payload) => ({
    type: ActionTypes.CREATE_TARIFF_AND_ASSIGN,
    payload
});

export const createTariffAndAssign = (user_id, payload) => (dispatch) => {
    const response = createData(ActionTypes.tariffsAssignUrl(user_id), {}, payload);

    response.then(
        (res) => dispatch(createTariffAndAssignAction(res.data.tariff)),
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};
