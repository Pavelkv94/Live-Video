import { message } from "antd";
import { fetchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    balanceOperations: []
};

export function balanceReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_BALANCE_OPERATIONS:
        return { ...state, balanceOperations: action.payload };

    default:
        return state;
    }
}

const fetcBalanceOperationsAction = (payload) => ({
    type: ActionTypes.FETCH_BALANCE_OPERATIONS,
    payload
});

export const fetchBalanceOperations = (user_id) => (dispatch) => {
    const response = fetchData(ActionTypes.balanceUrl(user_id), {}, {});

    response.then(
        (res) => dispatch(fetcBalanceOperationsAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

// const createTariffAction = (payload) => ({
//     type: ActionTypes.CREATE_TARIFF,
//     payload
// });

// export const createTariff = (payload) => (dispatch) => {
//     const response = createData(ActionTypes.tariffsUrl(), {}, payload);

//     response.then(
//         (res) => {
//             dispatch(createTariffAction(res.data.tariff));
//             message.success("Success!");
//         },
//         (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
//     );
// };

// const createTariffAndAssignAction = (payload) => ({
//     type: ActionTypes.CREATE_TARIFF_AND_ASSIGN,
//     payload
// });

// export const createTariffAndAssign = (user_id, payload) => (dispatch) => {
//     const response = createData(ActionTypes.tariffsAssignUrl(user_id), {}, payload);

//     response.then(
//         (res) => dispatch(createTariffAndAssignAction(res.data.tariff)),
//         (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
//     );
// };
