import { message } from "antd";
import { fetchData, createData, deleteData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";
import { fetchAllUsers } from "./usersReducer.js";

const initialState = {
    balanceOperations: []
};

export function balanceReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_BALANCE_OPERATIONS:
            return { ...state, balanceOperations: action.payload };
        case ActionTypes.ADMIN_ROLL_BACK_OPERATION:
            return { ...state, balanceOperations: {...state.balanceOperations, payments: state.balanceOperations.payments.filter(el => el.id !== action.id)} };
    
        default:
            return state;
    }
}

const fetcBalanceOperationsAction = (payload) => ({
    type: ActionTypes.FETCH_BALANCE_OPERATIONS,
    payload
});

export const fetchBalanceOperations = () => (dispatch) => {
    const response = fetchData(ActionTypes.balanceUrl(), {}, {});

    response.then(
        (res) => dispatch(fetcBalanceOperationsAction(res)),
        (err) => (err.response.data ? err.response.data.map((el) => message.error(el)) : message.error("Error"))
    );
};

// eslint-disable-next-line no-unused-vars
export const refillBalanceFromAdmin = (user_id, amount, mode) => (dispatch) => {
    //!user_id
    const response = createData(ActionTypes.refillBalanceFromAdminUrl(user_id), {}, { amount: amount });

    response.then(
        () => {
            mode === "fromBalance" ? dispatch(fetchBalanceOperations()) : dispatch(fetchAllUsers());
            message.success("Success")},
        (err) => (err.response.data ? err.response.data.map((el) => message.error(el)) : message.error("Error"))
    );
};

const rollBackOperationFromAdminAC = (id) => ({
    type: ActionTypes.ADMIN_ROLL_BACK_OPERATION,
    id
});

export const rollBackOperationFromAdmin = (payment_id) => (dispatch) => {
    const response = deleteData(ActionTypes.balanceOperationUrl(payment_id), {});

    response.then(
        () => {
            dispatch(rollBackOperationFromAdminAC(payment_id));
            message.success("Success");
        },
        (err) => (err.response.data ? err.response.data.map((el) => message.error(el)) : message.error("Error"))
    );
};
