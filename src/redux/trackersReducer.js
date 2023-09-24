import { message } from "antd";
import { createData, deleteData, fetchData, patchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";
import { isDateExpired } from "../utils/dateConvert.js";

const initialState = {
    trackersList: [],
    routesList: [],
    movementsSummary: [],
    movementsSummaryFetchStatus: "",

    reports: {},
    reportsFetchStatus: "",
    trackerModels: [],
    currentTracker: null,
    adminTrackerModels: []
};

export function trackersReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.FETCH_TRACKERS:
        return {
            ...state,
            trackersList: action.payload.tr_objects
                .map((el) => ({ ...el, isVisibleOnMap: true, shared: false }))
                .concat(action.payload.shared_tr_objects.map((el) => (
                    { ...el, isVisibleOnMap:  true, shared: true })))
        };
    case ActionTypes.FETCH_TRACKER:
        return { ...state, currentTracker: action.payload };
    case ActionTypes.CREATE_TRACKER:
        return { ...state, trackersList: [...state.trackersList, { ...action.payload, isVisibleOnMap: true }] };
    case ActionTypes.UPDATE_TRACKER:
        return {
            ...state,
            trackersList: state.trackersList.map((el) => (el.trobject_id === action.tr_id ? { ...action.payload, isVisibleOnMap: action.visible } : el))
        };
    case ActionTypes.DELETE_TRACKER:
        return { ...state, trackersList: state.trackersList.filter((el) => el.trobject_id !== action.tracker_id) };
    case ActionTypes.CHANGE_TRACKER_VISIBLE:
        return {
            ...state,
            trackersList: state.trackersList.map((el) => (el.trobject_id === action.tracker_id ? { ...el, isVisibleOnMap: action.isVisible } : el))
        };
    case ActionTypes.FETCH_TRACKER_MODELS:
        return { ...state, trackerModels: action.payload };
    case ActionTypes.FETCH_TRACKER_MODELS_ADMIN:
        return { ...state, adminTrackerModels: action.payload };
    case ActionTypes.DELETE_TRACKER_MODELS_ADMIN:
        return { ...state, adminTrackerModels: state.adminTrackerModels.filter((el) => el.trmodel_id !== action.id) };
    case ActionTypes.CREATE_TRACKER_MODELS_ADMIN:
        return { ...state, adminTrackerModels: [...state.adminTrackerModels, action.payload] };
    case ActionTypes.UPDATE_TRACKER_MODELS_ADMIN:
        return { ...state, adminTrackerModels: state.adminTrackerModels.map(el => el.trmodel_id === action.id ? action.payload : el) };

    case ActionTypes.FETCH_TRACKERS_REPORTS:
        return { ...state, reports: action.payload, reportType: action.reportType };
    case ActionTypes.FETCH_TRACKER_ROUTES:
        return { ...state, routesList: action.payload.routes };
    case ActionTypes.FETCH_MOVEMENTS:
        return { ...state, movementsSummary: action.payload, movementsSummaryFetchStatus: "fulfilled" };
        
    case ActionTypes.ADD_TRACKER_SHARING:
        return { ...state, 
            trackersList: state.trackersList.map(el => el.trobject_id === action.tr_id ? ({...el, shared_to: [...el.shared_to, action.payload]}) : el) };
        
    default:
        return state;
    }
}

const fetchTrackersAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKERS,
    payload
});

export const fetchTrackers = (user_id) => (dispatch) => {
    const response = fetchData(ActionTypes.trackersAllUrl(user_id), {}, {});

    response.then(
        (res) => dispatch(fetchTrackersAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const fetchTrackerAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKER,
    payload
});

export const fetchTracker = (tr_id) => (dispatch) => {
    const response = fetchData(ActionTypes.trackerUrl(tr_id), {}, {});

    response.then(
        (res) => dispatch(fetchTrackerAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const createTrackerAction = (payload) => ({
    type: ActionTypes.CREATE_TRACKER,
    payload
});

export const createTracker = (user_id, paylaod) => (dispatch) => {
    const response = createData(ActionTypes.trackersAllUrl(user_id), {}, paylaod);

    response.then(
        (res) => {
            dispatch(createTrackerAction(res.data));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const updateTrackerAction = (tr_id, payload, visible) => ({
    type: ActionTypes.UPDATE_TRACKER,
    payload,
    tr_id,
    visible
});

export const updateTracker = (tr_id, paylaod, visible) => (dispatch) => {
    const response = patchData(ActionTypes.trackerUrl(tr_id), {}, paylaod);

    response.then(
        (res) => {
            dispatch(updateTrackerAction(tr_id, res, visible));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const deleteTrackerAction = (tracker_id) => ({
    type: ActionTypes.DELETE_TRACKER,
    tracker_id
});

export const deleteTracker = (tracker_id) => (dispatch) => {
    const response = deleteData(ActionTypes.trackerUrl(tracker_id), {});

    response.then(
        () => {
            dispatch(deleteTrackerAction(tracker_id));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

export const changeTrackerVisibleAC = (tracker_id, isVisible) => ({
    type: ActionTypes.CHANGE_TRACKER_VISIBLE,
    tracker_id,
    isVisible
});

const fetchTrackerModelsAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKER_MODELS,
    payload
});

export const fetchTrackerModels = () => (dispatch) => {
    const response = fetchData(ActionTypes.trackerModelsUrl(), {}, {});

    response.then(
        (res) => dispatch(fetchTrackerModelsAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const fetchTrackersReportsAction = (payload, reportType) => ({
    type: ActionTypes.FETCH_TRACKERS_REPORTS,
    payload,
    reportType
});

export const fetchTrackersReports = (tr_id, query, reportType) => (dispatch) => {
    const response = fetchData(ActionTypes.trackerSummaryUrl(tr_id, query), {}, {});

    response.then(
        (res) => dispatch(fetchTrackersReportsAction(res, reportType)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

//ADMIN

const fetchTrackerModelsAdminAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKER_MODELS_ADMIN,
    payload
});

export const fetchTrackerModelsAdmin = () => (dispatch) => {
    const response = fetchData(ActionTypes.trackerModelsAdminUrl(), {}, {});

    response.then(
        (res) => dispatch(fetchTrackerModelsAdminAction(res)),
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};



const createTrackerModelAdminAction = (payload) => ({
    type: ActionTypes.CREATE_TRACKER_MODELS_ADMIN,
    payload
});

export const createTrackerModelAdmin = (payload) => (dispatch) => {
    const response = createData(ActionTypes.trackerModelsAdminUrl(), {}, payload);

    response.then(
        (res) => {
            dispatch(createTrackerModelAdminAction(res.data));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const updateTrackerModelAdminAction = (id, payload) => ({
    type: ActionTypes.UPDATE_TRACKER_MODELS_ADMIN,
    id,
    payload
});

export const updateTrackerModelAdmin = (id, payload) => (dispatch) => {
    const response = patchData(ActionTypes.trackerModelAdminUrl(id), {}, payload);
    response.then(
        (res) => {
            dispatch(updateTrackerModelAdminAction(id, res));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const deleteTrackerModelAdminAction = (id) => ({
    type: ActionTypes.DELETE_TRACKER_MODELS_ADMIN,
    id
});

export const deleteTrackerModelAdmin = (id) => (dispatch) => {
    const response = deleteData(ActionTypes.trackerModelAdminUrl(id), {}, {});

    response.then(
        () => {
            dispatch(deleteTrackerModelAdminAction(id));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const fetchTrackerRoutesAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKER_ROUTES,
    payload
});

export const fetchTrackerRoutes = (routesUrl) => (dispatch) => {
    const response = fetchData(ActionTypes.trackerRoutesUrl(routesUrl), {}, {});

    response.then(
        (res) => {
            dispatch(fetchTrackerRoutesAction(res));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};


//FETCH MOVEMENTS
const fetchMovementsAction = (payload) => ({
    type: ActionTypes.FETCH_MOVEMENTS,
    payload
});

export const fetchMovementsRoutes = (tr_id, query) => (dispatch) => {
    const response = fetchData(ActionTypes.trackerSummaryUrl(tr_id, query), {}, {});

    response.then(
        (res) => {
            dispatch(fetchMovementsAction(res));
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};



//FETCH POINTS
const fetchPointsAction = (payload) => ({
    type: ActionTypes.FETCH_POINTS,
    payload
});

export const fetchPointsRoutes = (tr_id, query) => (dispatch) => {
    const response = fetchData(ActionTypes.pointsSummaryUrl(tr_id, query), {}, {});

    response.then(
        (res) => {
            console.log(res);
            dispatch(fetchPointsAction(res));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};


//SHARING TRACKER
const addSharingTrackerAction = (tr_id, payload) => ({
    type: ActionTypes.ADD_TRACKER_SHARING,
    tr_id,
    payload
});

export const addSharingTracker = (tr_id, payload) => (dispatch) => {
    const response = createData(ActionTypes.trackerSharingUrl(tr_id), {}, payload);

    response.then(
        (res) => {
            dispatch(addSharingTrackerAction(tr_id, res.data));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const updateSharingTrackerAction = (tr_id, payload) => ({
    type: ActionTypes.UPDATE_TRACKER_SHARING,
    tr_id,
    payload
});

export const updateSharingTracker = (tr_id, payload) => (dispatch) => {
    const response = patchData(ActionTypes.trackerSharingUpdateUrl(tr_id), {}, payload);
    response.then(
        (res) => {
            dispatch(updateSharingTrackerAction(tr_id, res));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

const deleteSharingTrackerAction = (tr_id) => ({
    type: ActionTypes.DELETE_TRACKER_SHARING,
    tr_id
});

export const deleteSharingTracker = (tr_id) => (dispatch) => {
    const response = deleteData(ActionTypes.trackerSharingUpdateUrl(tr_id), {}, {});

    response.then(
        () => {
            dispatch(deleteSharingTrackerAction(tr_id));
            message.success("Success!");
        },
        (err) => message.error(err.response.data.message ? err.response.data.message : "Error")
    );
};

export const trackerProlongation = (tr_id, payload, user_id) => (dispatch) => {
    const response = createData(ActionTypes.trackerProlongUrl(tr_id), {}, payload);

    response.then(
        () => {
            dispatch(fetchTrackers(user_id));
            message.success("Success!");
        },
        (err) => message.error(err.response.data ? err.response.data[0] : "Error")
    );
};


