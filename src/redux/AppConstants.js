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
//CAMERAS SCHEDULE
export const FETCH_CAMERA_SCHEDULE = "FETCH_CAMERA_SCHEDULE";
export const FETCH_CAMERA_SCHEDULES= "FETCH_CAMERA_SCHEDULES";
export const ASSIGN_CAMERA_SCHEDULE = "ASSIGN_CAMERA_SCHEDULE";
export const DELETE_CAMERA_SCHEDULE = "DELETE_CAMERA_SCHEDULE";
// STORAGES
export const FETCH_STORAGE = "FETCH_STORAGE";
export const FETCH_STORAGES = "FETCH_STORAGES";
export const CREATE_STORAGE = "CREATE_STORAGE";
export const UPDATE_STORAGE = "UPDATE_STORAGE";
export const DELETE_STORAGE = "DELETE_STORAGE";
// BUCKETS
export const FETCH_BUCKET = "FETCH_BUCKET";
export const FETCH_BUCKETS = "FETCH_BUCKETS";
export const CREATE_BUCKET = "CREATE_BUCKET";
export const UPDATE_BUCKET = "UPDATE_BUCKET";
export const DELETE_BUCKET = "DELETE_BUCKET";
//VIDEOS
export const FETCH_VIDEO = "FETCH_VIDEO";
export const FETCH_VIDEOS = "FETCH_VIDEOS";
export const UPDATE_VIDEO = "UPDATE_VIDEO";
export const DELETE_VIDEO = "DELETE_VIDEO";
//SCHEDULES
export const FETCH_SCHEDULE = "FETCH_SCHEDULE";
export const FETCH_SCHEDULES = "FETCH_SCHEDULES";
export const CREATE_SCHEDULE = "CREATE_SCHEDULE";
export const UPDATE_SCHEDULE = "UPDATE_VIDEO";
export const DELETE_SCHEDULE = "DELETE_SCHEDULE";
export const FETCH_ASSIGN_CAMERAS = "FETCH_ASSIGN_CAMERAS";
export const IS_ENABLE_SCHEDULE = "IS_ENABLE_SCHEDULE";
//URLS
export const usersUrl = () => `users`;
export const userUrl = (id) => `users/${id}`;

export const camerasAllUrl = (id) => `users/${id}/cameras`;
export const camerasUrl = (id) => `cameras/${id}`;

export const cameraSchedulesAllUrl = (cameraId) => `cameras/${cameraId}/schedules`;
export const cameraScheduleUrl = (cameraId, scheduleId) => `cameras/${cameraId}/schedules/${scheduleId}`;

export const storagesAllUrl = (id) => `users/${id}/storages`;
export const storageUrl = (id) => `storages/${id}`;

export const bucketsAllUrl = (id) => `storages/${id}/buckets`;
export const bucketUrl = (id) => `buckets/${id}`;

export const videosAllUrl = (id) => `cameras/${id}/videos`;
export const videoUrl = (id) => `videos/${id}`;

export const schedulesAllUrl = (id) => `users/${id}/schedules`;
export const scheduleUrl = (id) => `schedules/${id}`;
export const assignedCamerasUrl = (id) => `schedules/${id}/cameras`;