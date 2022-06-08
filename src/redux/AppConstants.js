export const ME = "ME";
export const FETCH_USER = "FETCH_USER";
export const SET_USER = "SET_USER";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const REGISTER_USER = "REGISTER_USER";
export const DELETE_USER = "DELETE_USER";
export const SET_REGISTER_STATUS = "SET_STATUS";
export const INITIALIZED = "INITIALIZED";
//CAMERAS
export const FETCH_CAMERA = "FETCH_CAMERA";
export const FETCH_CAMERAS = "FETCH_CAMERAS";
export const CREATE_CAMERA = "CREATE_CAMERA";
export const UPDATE_CAMERA = "UPDATE_CAMERA";
export const DELETE_CAMERA = "DELETE_CAMERA";
// STORAGES
export const FETCH_STORAGE = "FETCH_STORAGE";
export const FETCH_STORAGES = "FETCH_STORAGES";
export const CREATE_STORAGE = "CREATE_STORAGE";
export const UPDATE_STORAGE = "UPDATE_STORAGE";
export const DELETE_STORAGE = "DELETE_STORAGE";
//VIDEOS
export const FETCH_VIDEO = "FETCH_VIDEO";
export const FETCH_VIDEOS = "FETCH_VIDEOS";
export const CREATE_VIDEO = "CREATE_VIDEO";
export const UPDATE_VIDEO = "UPDATE_VIDEO";
export const DELETE_VIDEO = "DELETE_VIDEO";
//SCHEDULES
export const FETCH_SCHEDULE = "FETCH_SCHEDULE";
export const FETCH_SCHEDULES = "FETCH_SCHEDULES";
export const CREATE_SCHEDULE = "CREATE_SCHEDULE";
export const UPDATE_SCHEDULE = "UPDATE_VIDEO";
export const DELETE_SCHEDULE = "DELETE_SCHEDULE";
//URLS
export const usersUrl = () => `users`;
export const userUrl = (id) => `users/${id}`;

export const camerasAllUrl = (id) => `users/${id}/cameras`;
export const camerasUrl = (id) => `cameras/${id}`;

export const storagesAllUrl = (id) => `users/${id}/storages`;
export const storageUrl = (id) => `storages/${id}`;

export const videosAllUrl = (id) => `cameras/${id}/videos`;
export const videoUrl = (id) => `videos/${id}`;

export const schedulesAllUrl = (id) => `users/${id}/schedules`;
export const scheduleUrl = (id) => `schedules/${id}`;