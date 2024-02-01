import { message } from "antd";
import { fetchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    hosts: [],
    ports: []
};

export function trackersSystemReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.ADMIN_FETCH_HOSTS:
        return { ...state, hosts: action.hosts };
    case ActionTypes.ADMIN_FETCH_PORTS:
        return { ...state, ports: action.ports };
    default:
        return state;
    }
}

const fetchHostsAction = (hosts) => ({
    type: ActionTypes.ADMIN_FETCH_HOSTS,
    hosts
});

export const fetchHosts = () => (dispatch) => {
    const response = fetchData(ActionTypes.hostsUrl(), {}, {});

    response.then(
        (res) => {
            dispatch(fetchHostsAction(res));
        },
        (err) => {
            err.response.data ? err.response.data.map((el) => message.error(el)) : message.error("Error");
        }
    );
};

const fetchPortsAction = (hosts) => ({
    type: ActionTypes.ADMIN_FETCH_PORTS,
    hosts
});

export const fetchPorts = () => (dispatch) => {
    const response = fetchData(ActionTypes.portsUrl(), {}, {});

    response.then(
        (res) => {
            dispatch(fetchPortsAction(res));
        },
        (err) => {
            err.response.data ? err.response.data.map((el) => message.error(el)) : message.error("Error");
        }
    );
};
