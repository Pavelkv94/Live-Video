import { message } from "antd";
import { createData, deleteData, fetchData, patchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";
import { fetchCameras } from "./camerasReducer.js";
import { buildMovementsWithAdresses } from "../utils/buildMovementsWithAdresses.js";

const initialState = {
    trackersList: [],
    trackersFetchStatus: "",
    trackerSharings: [],
    routesList: [],
    routesFetchStatus: "",
    routesMovementsSummary: [],
    movementsSummary: [],
    movementsSummaryFetchStatus: "",
    waypointsSummary: [],
    waypointsSummaryFetchStatus: "",
    reportType: "",
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
            trackersList: action.payload
                .map((el) => ({ ...el, isVisibleOnMap: true, shared: false }))
        };
    case ActionTypes.FETCH_TRACKERS_STATUS:
        return { ...state, trackersFetchStatus: action.status };
        
    case ActionTypes.FETCH_TRACKER:
        return { ...state, currentTracker: action.payload };
    case ActionTypes.CREATE_TRACKER:
        return { ...state, trackersList: [...state.trackersList, { ...action.payload, isVisibleOnMap: true }] };
    case ActionTypes.UPDATE_TRACKER:
        return {
            ...state,
            trackersList: state.trackersList.map((el) => (el.id === action.tr_id ? { ...action.payload, isVisibleOnMap: action.visible } : el))
        };
    case ActionTypes.DELETE_TRACKER:
        return { ...state, trackersList: state.trackersList.filter((el) => el.id !== action.tracker_id) };
    case ActionTypes.CHANGE_TRACKER_VISIBLE:
        return {
            ...state,
            trackersList: state.trackersList.map((el) => (el.id === action.tracker_id ? { ...el, isVisibleOnMap: action.isVisible } : el))
        };
    case ActionTypes.FETCH_TRACKER_MODELS:
        return { ...state, trackerModels: action.payload };
    case ActionTypes.FETCH_TRACKER_MODELS_ADMIN:
        return { ...state, adminTrackerModels: action.payload };
    case ActionTypes.DELETE_TRACKER_MODELS_ADMIN:
        return { ...state, adminTrackerModels: state.adminTrackerModels.filter((el) => el.id !== action.id) };
    case ActionTypes.CREATE_TRACKER_MODELS_ADMIN:
        return { ...state, adminTrackerModels: [...state.adminTrackerModels, action.payload] };
    case ActionTypes.UPDATE_TRACKER_MODELS_ADMIN:
        return { ...state, adminTrackerModels: state.adminTrackerModels.map(el => el.trmodel_id === action.id ? action.payload : el) };

    case ActionTypes.FETCH_TRACKERS_REPORTS:
        return { ...state, reports: action.payload, reportType: action.reportType };
    case ActionTypes.FETCH_TRACKERS_REPORTS_STATUS:
        return { ...state, reportsFetchStatus: action.status };
        
    case ActionTypes.FETCH_TRACKER_ROUTES:
        return { ...state, routesList: action.payload };
    case ActionTypes.FETCH_TRACKER_ROUTES_STATUS:
        return { ...state, routesFetchStatus: action.status };
    case ActionTypes.FETCH_MOVEMENTS:
        return { ...state, movementsSummary: action.payload};
    case ActionTypes.SET_MOVEMENTS_STATUS:
        return { ...state, movementsSummaryFetchStatus: action.status};
    case ActionTypes.FETCH_TRACKER_MOVEMENTS_ROUTES:
        return { ...state, routesMovementsSummary: action.payload };
    case ActionTypes.FETCH_WAYPOINTS:
        return { ...state, waypointsSummary: action.payload };
    case ActionTypes.SET_WAYPOINTS_STATUS:
        return { ...state, waypointsSummaryFetchStatus: action.status};
    case ActionTypes.SET_ADDRESS_WAYPOINT:
        return { ...state, waypointsSummary:  state.waypointsSummary.map(el => el.id === action.id ? ({...el, address: action.address}) : el)};
    case ActionTypes.CLEAR_MOVEMENTS:
        return { ...state, movementsSummary: []};
    case ActionTypes.CLEAR_POINTS:
        return { ...state, waypointsSummary: []};

    //todo без установки адресов в соседние элементы
    // case ActionTypes.SET_ADDRESS_MOVEMENT:
    //     return {
    //         ...state,
    //         movementsSummary: state.movementsSummary.map((el) =>
    //             el.tracker_id === action.id
    //                 ? {
    //                     ...el,
    //                     movement_summary: el.movement_summary.map((movement, index, array) => {
    //                         if(movement.start_datetime === action.start_date) { 
    //                             return { ...movement, [action.dateField]: action.address };
    //                         } else return  movement;
    //                     }
    //                     )
    //                 }
    //                 : el
    //         )
    //     };
    case ActionTypes.SET_ADDRESS_MOVEMENT:
        return {
            ...state,
            movementsSummary: state.movementsSummary.map((el) =>
                el.tracker_id === action.id
                    ? {
                        ...el,
                        movement_summary: buildMovementsWithAdresses(el.movement_summary, action)
                    }
                    : el
            )
        };
        
    case ActionTypes.FETCH_TRACKER_SHARINGS:
        return { ...state, 
            trackerSharings: action.payload };
    case ActionTypes.ADD_TRACKER_SHARING:
        return { ...state, 
            trackerSharings: [...state.trackerSharings, action.payload] };
          
    case ActionTypes.DELETE_TRACKER_SHARING:
        return { ...state, 
            trackerSharings: state.trackerSharings.filter(el => el.id !== action.sharing_id)};
                
            
    default:
        return state;
    }
}

const fetchTrackersAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKERS,
    payload
});
const setFetchTrackersStatusAction = (status) => ({
    type: ActionTypes.FETCH_TRACKERS_STATUS,
    status
});

export const fetchTrackers = (user_id) => (dispatch) => {
    dispatch(setFetchTrackersStatusAction("pending"));
    const response = fetchData(ActionTypes.trackersAllUrl(user_id), {}, {});

    response.then(
        (res) => {
            dispatch(fetchTrackersAction(res));
            dispatch(setFetchTrackersStatusAction("fulfilled"));
        },
        (err) => {
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
            dispatch(setFetchTrackersStatusAction("reject"));
        }
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
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const createTrackerAction = (payload) => ({
    type: ActionTypes.CREATE_TRACKER,
    payload
});

export const createTracker = (user_id, payload) => (dispatch) => {
    const response = createData(ActionTypes.trackersAllUrl(user_id), {}, payload);

    response.then(
        (res) => {
            dispatch(createTrackerAction(res.data));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const updateTrackerAction = (tr_id, payload, visible) => ({
    type: ActionTypes.UPDATE_TRACKER,
    payload,
    tr_id,
    visible
});

export const updateTracker = (tr_id, payload, visible) => (dispatch) => {
    const response = patchData(ActionTypes.trackerUrl(tr_id), {}, payload);

    response.then(
        (res) => {
            dispatch(updateTrackerAction(tr_id, res, visible));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
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
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
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
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

export const fetchTrackersReportsAction = (payload, reportType) => ({
    type: ActionTypes.FETCH_TRACKERS_REPORTS,
    payload,
    reportType
});

const fetchTrackersReportsStatusAction = (status) => ({
    type: ActionTypes.FETCH_TRACKERS_REPORTS_STATUS,
    status
});


export const fetchTrackersReports = (query, reportType) => (dispatch) => {
    dispatch(fetchTrackersReportsStatusAction("pending"));
    const response = fetchData(ActionTypes.trackerSummaryUrl(query), {}, {});

    response.then(
        (res) => {
            dispatch(fetchTrackersReportsAction(res, reportType));
            message.success("Success!");
            dispatch(fetchTrackersReportsStatusAction("fulfilled"));
        },
        (err) => {
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
            dispatch(fetchTrackersReportsStatusAction("rejected"));
        }
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
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
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
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
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
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
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
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};


const fetchTrackerRoutesAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKER_ROUTES,
    payload
});

const fetchTrackerMovementsRoutesAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKER_MOVEMENTS_ROUTES,
    payload
});

const fetchTrackerRoutesStatusAction = (status) => ({
    type: ActionTypes.FETCH_TRACKER_ROUTES_STATUS,
    status
});


export const fetchTrackerRoutes = (routesUrl) => (dispatch) => {
    dispatch(fetchTrackerRoutesStatusAction("pending"));
    const response = fetchData(ActionTypes.trackerSummaryUrl(routesUrl), {}, {});

    response.then(
        (res) => {
            dispatch(fetchTrackerRoutesAction(res));
            message.success("Sucscess!");
            dispatch(fetchTrackerRoutesStatusAction("fulfilled"));

        },
        (err) => {
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
            dispatch(fetchTrackerRoutesStatusAction("rejected"));

        }
    );
};

export const fetchTrackerMovementRoutes = (routesUrl) => (dispatch) => {
    const response = fetchData(ActionTypes.trackerSummaryUrl(routesUrl), {}, {});

    response.then(
        (res) => {
            dispatch(fetchTrackerMovementsRoutesAction(res));
            message.success("Success!");
        },
        (err) => {
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");

        }
    );
};


//FETCH MOVEMENTS
const fetchMovementsAction = (payload) => ({
    type: ActionTypes.FETCH_MOVEMENTS,
    payload
});

const setMovementsStatusAction = (status) => ({
    type: ActionTypes.SET_MOVEMENTS_STATUS,
    status
});

export const fetchMovementsRoutes = (query) => (dispatch) => {
    const response = fetchData(ActionTypes.trackerSummaryUrl(query), {}, {});
    dispatch(setMovementsStatusAction("pending"));
    response.then(
        (res) => {
            dispatch(setMovementsStatusAction("fulfilled"));
            dispatch(fetchMovementsAction(res));
        },
        (err) => {
            dispatch(setMovementsStatusAction("rejected"));

            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");}
    );
};

export const clearMovements = () => ({
    type: ActionTypes.CLEAR_MOVEMENTS
});

export const clearPoints = () => ({
    type: ActionTypes.CLEAR_POINTS
});

//FETCH POINTS
const fetchPointsAction = (payload) => ({
    type: ActionTypes.FETCH_WAYPOINTS,
    payload
});
const setWaypointsStatusAction = (status) => ({
    type: ActionTypes.SET_WAYPOINTS_STATUS,
    status
});

export const fetchPointsRoutes = (tr_id, query) => (dispatch) => {
    const response = fetchData(ActionTypes.pointsSummaryUrl(tr_id, query), {}, {});
    dispatch(setWaypointsStatusAction("pending"));
    response.then(
        (res) => {
            dispatch(setWaypointsStatusAction("fulfilled"));
            dispatch(fetchPointsAction(res));
            message.success("Success!");
        },
        (err) => {
            dispatch(setWaypointsStatusAction("rejected"));
            err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error");
        }
    );
};

export const setAddressWaypointAction = (id, address) => ({
    type: ActionTypes.SET_ADDRESS_WAYPOINT,
    id, 
    address
});

export const setAddressMovementAction = (id, address, start_date, dateField) => ({
    type: ActionTypes.SET_ADDRESS_MOVEMENT,
    id, 
    address,
    start_date,
    dateField
});

//SHARING TRACKER

const fetchTrackerSharingsAction = (payload) => ({
    type: ActionTypes.FETCH_TRACKER_SHARINGS,
    payload
});

export const fetchTrackerSharings = (tr_id) => (dispatch) => {
    const response = fetchData(ActionTypes.trackerSharingsUrl(tr_id), {}, {});

    response.then(
        (res) => {
            dispatch(fetchTrackerSharingsAction(res));
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

const addSharingTrackerAction = (tr_id, payload) => ({
    type: ActionTypes.ADD_TRACKER_SHARING,
    tr_id,
    payload
});

export const addSharingTracker = (tr_id, payload) => (dispatch) => {
    const response = createData(ActionTypes.trackerSharingsUrl(tr_id), {}, payload);

    response.then(
        (res) => {
            dispatch(addSharingTrackerAction(tr_id, res.data));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

// const updateSharingTrackerAction = (tr_id, payload) => ({
//     type: ActionTypes.UPDATE_TRACKER_SHARING,
//     tr_id,
//     payload
// });

// export const updateSharingTracker = (tr_id, payload) => (dispatch) => {
//     const response = patchData(ActionTypes.trackerSharingUpdateUrl(tr_id), {}, payload);
//     response.then(
//         (res) => {
//             dispatch(updateSharingTrackerAction(tr_id, res));
//             message.success("Success!");
//         },
//         (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
//     );
// };

const deleteSharingTrackerAction = (sharing_id, tr_id) => ({
    type: ActionTypes.DELETE_TRACKER_SHARING,
    sharing_id,
    tr_id
});

export const deleteSharingTracker = (tr_id, sharing_id ) => (dispatch) => {
    const response = deleteData(ActionTypes.trackerSharingUpdateUrl(tr_id, sharing_id), {}, {});

    response.then(
        () => {
            dispatch(deleteSharingTrackerAction(sharing_id, tr_id));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

export const trackerProlongation = (tr_id, payload, user_id) => (dispatch) => {
    const response = createData(ActionTypes.trackerProlongUrl(tr_id), {}, payload);

    response.then(
        () => {
            dispatch(fetchTrackers(user_id));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};

export const cameraProlongation = (tr_id, payload, user_id) => (dispatch) => {
    const response = createData(ActionTypes.cameraProlongUrl(tr_id), {}, payload);

    response.then(
        () => {
            dispatch(fetchCameras(user_id));
            message.success("Success!");
        },
        (err) => err.response.data ? err.response.data.map(el => message.error(el)) : message.error("Error")
    );
};


