import { message } from "antd";
import { createData, fetchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    tariffsList: []
};

export function tariffsReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_TARIFFS:
        return { ...state, tariffsList: action.payload };
    case ActionTypes.CREATE_TARIFF:
        return { ...state, tariffsList: [...state.tariffsList, action.payload] };

    default:
        return state;
    }
}

const fetchTariffsAction = (payload) => ({
    type: ActionTypes.FETCH_TARIFFS,
    payload
});

export const fetchTariffs = () => (dispatch) => {
    const response = fetchData(ActionTypes.tariffsUrl(), {}, {});

    response.then(
        (res) => dispatch(fetchTariffsAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const createTariffAction = (payload) => ({
    type: ActionTypes.CREATE_TARIFF,
    payload
});

export const createTariff = (payload) => (dispatch) => {
    const response = createData(ActionTypes.tariffsUrl(), {}, payload);

    response.then(
        (res) => {
            dispatch(createTariffAction(res.data.tariff));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
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
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};
