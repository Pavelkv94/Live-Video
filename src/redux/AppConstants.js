export const ME = "ME";
export const FETCH_USER = "FETCH_USER";
export const SET_USER = "SET_USER";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const DELETE_USER = "DELETE_USER";
export const SET_REGISTER_STATUS = "SET_STATUS";
export const SET_AUTH_STATUS = "SET_AUTH_STATUS";
export const SET_EMAIL_STATUS = "SET_EMAIL_STATUS";
export const SET_TOKEN_STATUS = "SET_TOKEN_STATUS";
export const SET_RECOVERY_STATUS = "SET_RECOVERY_STATUS";
export const LOGIN = "LOGIN";

//CAMERAS
export const FETCH_CAMERA = "FETCH_CAMERA";
export const FETCH_CAMERAS = "FETCH_CAMERAS";
export const CREATE_CAMERA = "CREATE_CAMERA";
export const UPDATE_CAMERA = "UPDATE_CAMERA";
export const DELETE_CAMERA = "DELETE_CAMERA";

export const ADD_CAMERA_SHARING = "ADD_CAMERA_SHARING";
export const UPDATE_CAMERA_SHARING = "UPDATE_CAMERA_SHARING";
export const DELETE_CAMERA_SHARING = "DELETE_CAMERA_SHARING";


//CAMERAS SCHEDULE
export const FETCH_CAMERA_SCHEDULE = "FETCH_CAMERA_SCHEDULE";
export const FETCH_CAMERA_SCHEDULES = "FETCH_CAMERA_SCHEDULES";
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

//TRACKERS
export const FETCH_TRACKERS = "FETCH_TRACKERS";
export const FETCH_TRACKER = "FETCH_TRACKER";
export const CREATE_TRACKER = "CREATE_TRACKER";
export const UPDATE_TRACKER = "UPDATE_TRACKER";
export const DELETE_TRACKER = "DELETE_TRACKER";
export const CHANGE_TRACKER_VISIBLE = "CHANGE_TRACKER_VISIBLE";
export const ASSIGN_MONITORING_OBJECT_TRACKER = "ASSIGN_MONITORING_OBJECT_TRACKER";
export const UNASSIGN_MONITORING_OBJECT_TRACKER = "UNASSIGN_MONITORING_OBJECT_TRACKER";
export const FETCH_TRACKER_MODELS = "FETCH_TRACKER_MODELS";
export const FETCH_TRACKERS_REPORTS = "FETCH_TRACKERS_REPORTS";
export const FETCH_TRACKER_MODELS_ADMIN = "FETCH_TRACKER_MODELS_ADMIN";
export const DELETE_TRACKER_MODELS_ADMIN = "DELETE_TRACKER_MODELS_ADMIN";
export const UPDATE_TRACKER_MODELS_ADMIN = "UPDATE_TRACKER_MODELS_ADMIN";
export const CREATE_TRACKER_MODELS_ADMIN = "CREATE_TRACKER_MODELS_ADMIN";
//TRACKERS ROUTES
export const FETCH_TRACKER_ROUTES = "FETCH_TRACKER_ROUTES";

export const FETCH_MOVEMENTS = "FETCH_MOVEMENTS";
export const FETCH_POINTS = "FETCH_POINTS";



//TRACKERS SHARING
export const ADD_TRACKER_SHARING = "ADD_TRACKER_SHARING";
export const UPDATE_TRACKER_SHARING = "UPDATE_TRACKER_SHARING";
export const DELETE_TRACKER_SHARING = "DELETE_TRACKER_SHARING";







//MONITORING
export const FETCH_MONITORING_OBJECTS = "FETCH_MONITORING_OBJECTS";
export const FETCH_MONITORING_OBJECT = "FETCH_MONITORING_OBJECT";
export const CREATE_MONITORING_OBJECT = "CREATE_MONITORING_OBJECT";
export const DELETE_MONITORING_OBJECT = "DELETE_MONITORING_OBJECT";

export const UPDATE_MONITORING_OBJECT = "UPDATE_MONITORING_OBJECT";
export const RESET_MONITORING_OBJECT = "RESET_MONITORING_OBJECT";
export const FETCH_SHARED_MONITORING_OBJECTS = "FETCH_SHARED_MONITORING_OBJECTS";
export const DELETE_SHARED_MONITORING_OBJECTS = "DELETE_SHARED_MONITORING_OBJECTS";
export const ADD_SHARED_USER = "ADD_SHARED_USER";
export const CHANGE_ACCESS_LEVEL = "CHANGE_ACCESS_LEVEL";
export const FETCH_MONITORING_OBJECT_CAMERAS = "FETCH_MONITORING_OBJECT_CAMERAS";
export const CREATE_MONITORING_OBJECT_CAMERAS = "CREATE_MONITORING_OBJECT_CAMERAS";
export const FETCH_MONITORING_OBJECT_TRACKERS = "FETCH_MONITORING_OBJECT_TRACKERS";
export const ASSIGN_MONITORING_OBJECT_CAMERAS = "ASSIGN_MONITORING_OBJECT_CAMERAS";
export const UNASSIGN_MONITORING_OBJECT_CAMERAS = "UNASSIGN_MONITORING_OBJECT_CAMERAS";
export const CREATE_MONITORING_OBJECT_TRACKERS = "CREATE_MONITORING_OBJECT_TRACKERS";
export const CHANGE_MONITORING_TRACKER_VISIBLE = "CHANGE_MONITORING_TRACKER_VISIBLE";

//BALANCE
export const FETCH_BALANCE_OPERATIONS = "FETCH_BALANCE_OPERATIONS";


//TARIFFS

export const FETCH_TARIFFS = "FETCH_TARIFFS";
export const CREATE_TARIFF = "CREATE_TARIFF";
export const CREATE_TARIFF_AND_ASSIGN = "CREATE_TARIFF_AND_ASSIGN";

//NOTIFICATIONS
export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const DELETE_NOTIFICATIONS = "DELETE_NOTIFICATIONS";
export const VIEW_NOTIFICATION = "VIEW_NOTIFICATION";
export const VIEW_ALL_NOTIFICATIONS = "VIEW_ALL_NOTIFICATIONS";
export const DELETE_ALL_NOTIFICATIONS = "DELETE_ALL_NOTIFICATIONS";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";



export const FETCH_ADMIN_NOTIFICATIONS = "FETCH_ADMIN_NOTIFICATIONS";
export const CREATE_ADMIN_NOTIFICATIONS = "CREATE_ADMIN_NOTIFICATIONS";
export const UPDATE_ADMIN_NOTIFICATIONS= "UPDATE_ADMIN_NOTIFICATIONS";
export const DELETE_ADMIN_NOTIFICATIONS = "DELETE_ADMIN_NOTIFICATIONS";
export const ADMIN_EDIT_USER = "ADMIN_EDIT_USER";




//URLS
export const sessionUrl = () => "session";

export const usersUrl = () => "users";
export const userUrl = (id) => `users/${id}`;
export const activationUrl = (email) => `users/activation_mail?email=${email}`;

export const passwordRecovery = () => "users/password_recovery";
export const passwordRecoveryToken = (token) => `users/password_recovery/${token}`;

export const camerasAllUrl = (id) => `users/${id}/cameras`;
export const camerasUrl = (id) => `cameras/${id}`;

export const cameraSharingCreateUrl = (cam_id) => `sharings/camera/${cam_id}`;
export const cameraSharingUrl = (cam_id) => `sharings/cameras_sharing/${cam_id}`;

export const cameraSchedulesAllUrl = (cameraId) => `cameras/${cameraId}/schedules`;
export const cameraScheduleUrl = (cameraId, scheduleId) => `cameras/${cameraId}/schedules/${scheduleId}`;

export const storagesAllUrl = () => "storages";
export const storageUrl = (id) => `storages/${id}`;

export const bucketsAllUrl = (id) => `storages/${id}/buckets`;
export const bucketUrl = (id) => `buckets/${id}`;

export const videosAllUrl = (id) => `cameras/${id}/videos`;
export const videoUrl = (id) => `videos/${id}`;

export const schedulesAllUrl = () => "schedules";
export const scheduleUrl = (id) => `schedules/${id}`;
export const assignedCamerasUrl = (id) => `schedules/${id}/cameras`;

export const trackersAllUrl = (user_id) => `users/${user_id}/tr_objects`;
export const trackerUrl = (tracker_id) => `tr_objects/${tracker_id}`;
export const trackerModelsUrl = () => "tr_models";
export const trackerSummaryUrl = (tr_id, query) => `tr_objects/${tr_id}/summary?${query}`; //?s!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const trackerModelsAdminUrl = () => "admin/tr_models";
export const trackerModelAdminUrl = (id) => `admin/tr_models/${id}`;
export const trackerProlongUrl = (id) => `/tr_objects/${id}/prolongations`;


export const trackerRoutesUrl = (url) => `routes?${url}`;//!!!!!!!!!!!!!!!!!!!!!!!!!!!1
export const movementsSummaryUrl = (tr_id, query) => `tr_objects/${tr_id}/movement_summary?${query}`;//!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
export const pointsSummaryUrl = (tr_id, query) => `tr_objects/${tr_id}/tr_object_points?${query}`;//!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

export const trackerSharingUrl = (tr_id) => `sharings/tr_object/${tr_id}`;
export const trackerSharingUpdateUrl = (tr_id) => `sharings/tr_objects_sharing/${tr_id}`;

export const monitoringObjectsAllUrl = (user_id) => `users/${user_id}/monitoring_objects`;
export const monitoringObjectUrl = (obj_id) => `monitoring_objects/${obj_id}`;
export const sharedMonitoringObjectUrl = (user_id) => `users/${user_id}/shared_monitoring_objects`;
export const sharedUserUrl = (obj_id) => `monitoring_objects/${obj_id}/sharings`;
export const sharingsUrl = (obj_id) => `sharings/${obj_id}`;
export const monitoringObjectCamerasUrl = (obj_id) => `monitoring_objects/${obj_id}/cameras`;
export const monitoringObjectTrackersUrl = (obj_id) => `monitoring_objects/${obj_id}/tr_objects`;
export const monitoringObjectAssignCamerasUrl = (obj_id, cam_id) => `monitoring_objects/${obj_id}/camera_attachment?camera_id=${cam_id}`;
export const monitoringObjectAssignTrackersUrl = (obj_id, tr_id) => `monitoring_objects/${obj_id}/tr_object_attachment?tr_object_id=${tr_id}`;

export const feedbackUrl = () => "form_requests";

export const notificationsUrl = (user_id) => `users/${user_id}/notifications`;
export const notificationUrl = (note_id) => `notifications/${note_id}`;
export const notificationsAdminUrl = () => "admin/notifications";
export const notificationAdminUrl = (note_id) => `admin/notifications/${note_id}`;

export const tariffsUrl = () => "tariffs";
export const tariffsAssignUrl = (user_id) => `users/${user_id}/tariffs`;

export const balanceUrl = (user_id) => `users/${user_id}/balance_operations`;
export const balanceOperationUrl = (bal_id) => `balance_operations/${bal_id}`;
