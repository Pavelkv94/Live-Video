import { message } from "antd";
import { createData, deleteData, fetchData, updateData } from "../api/api.js";
import * as ActionTypes from "./AppConstants.js";

const initialState = {
    videosList: [],
    currentVideo: {},
};

export function videosReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_VIDEOS:
            return { ...state, videosList: action.payload };
        case ActionTypes.FETCH_VIDEO:
            return { ...state, currentVideo: action.payload };
        default:
            return state;
    }
}

const fetchVideosAction = (payload) => ({
    type: ActionTypes.FETCH_VIDEOS,
    payload: payload,
});

export const fetchVideos = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.videosAllUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchVideosAction(res.data)),
        (err) => console.log(err)
    );
};

const fetchVideoAction = (payload) => ({
    type: ActionTypes.FETCH_VIDEO,
    payload: payload,
});

export const fetchVideo = (id) => (dispatch) => {
    const response = fetchData(ActionTypes.videoUrl(id), {}, {});

    response.then(
        (res) => dispatch(fetchVideoAction(res.data)),
        (err) => console.log(err)
    );
};



//Delete video from storage
const updateVideoAction = (payload) => ({
    type: ActionTypes.UPDATE_VIDEO,
    payload,
});

export const updateVideo = (payload, id, userId) => (dispatch) => {
    const response = updateData(ActionTypes.videoUrl(id), {}, payload);

    response.then((res) => {
        dispatch(updateVideoAction(res.data));
        dispatch(fetchVideos(userId));
        message.success("Success!");
    }, err => message.error(err.response.data ? err.response.data.data.message : "Error"));
};

export const deleteVideo = (id, userId) => (dispatch) => {
    const response = deleteData(ActionTypes.videoUrl(id), {});

    response.then(
        () => {
            dispatch(fetchVideos(userId));
            message.success("Success!");
        },
        (err) =>
            message.error(
                err.response.data ? err.response.data.data.message : "Error"
            )
    );
};
