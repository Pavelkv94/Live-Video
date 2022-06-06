import { createData, deleteData, fetchData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    camerasList: [],
};

export function camerasReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_CAMERAS:
            return { ...state, camerasList: action.payload };

        default:
            return state;
    }
}

const fetchCamerasAction = (payload) => ({
    type: ActionTypes.FETCH_CAMERAS,
    payload: payload,
});

export const fetchCameras = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.userUrl(id), {}, {}, "cameras");

    response.then(
        (res) => dispatch(fetchCamerasAction(res.data)),
        (err) => console.log(err)
    );
};
