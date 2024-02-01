import color1 from "../../assets/img/markers/png/FF0000.png";
import color2 from "../../assets/img/markers/png/FF4000.png";
import color3 from "../../assets/img/markers/png/FF8000.png";
import color4 from "../../assets/img/markers/png/FFBF00.png";
import color5 from "../../assets/img/markers/png/FFFF00.png";
import color6 from "../../assets/img/markers/png/BFFF00.png";
import color7 from "../../assets/img/markers/png/80FF00.png";
import color8 from "../../assets/img/markers/png/40FF00.png";
import color9 from "../../assets/img/markers/png/00FF00.png";
import color10 from "../../assets/img/markers/png/00FF40.png";
import color11 from "../../assets/img/markers/png/00FF80.png";
import color12 from "../../assets/img/markers/png/00FFBF.png";
import color13 from "../../assets/img/markers/png/00FFFF.png";
import color14 from "../../assets/img/markers/png/00BFFF.png";
import color15 from "../../assets/img/markers/png/0080FF.png";
import color16 from "../../assets/img/markers/png/0040FF.png";
import color17 from "../../assets/img/markers/png/0000FF.png";
import color18 from "../../assets/img/markers/png/4000FF.png";
import color19 from "../../assets/img/markers/png/8000FF.png";
import color20 from "../../assets/img/markers/png/BF00FF.png";
import color21 from "../../assets/img/markers/png/FF00FF.png";
import color22 from "../../assets/img/markers/png/FF00BF.png";
import color23 from "../../assets/img/markers/png/FF0080.png";
import color24 from "../../assets/img/markers/png/FF0040.png";
import color25 from "../../assets/img/markers/png/FF8080.png";
import color26 from "../../assets/img/markers/png/FFC0C0.png";
import color27 from "../../assets/img/markers/png/FFFFC0.png";
import color28 from "../../assets/img/markers/png/C0FFC0.png";
import color29 from "../../assets/img/markers/png/C0C0FF.png";
import color30 from "../../assets/img/markers/png/FFC0FF.png";

import SVGcolor1 from "../../assets/img/markers/svg/FF0000.svg";
import SVGcolor2 from "../../assets/img/markers/svg/FF4000.svg";
import SVGcolor3 from "../../assets/img/markers/svg/FF8000.svg";
import SVGcolor4 from "../../assets/img/markers/svg/FFBF00.svg";
import SVGcolor5 from "../../assets/img/markers/svg/FFFF00.svg";
import SVGcolor6 from "../../assets/img/markers/svg/BFFF00.svg";
import SVGcolor7 from "../../assets/img/markers/svg/80FF00.svg";
import SVGcolor8 from "../../assets/img/markers/svg/40FF00.svg";
import SVGcolor9 from "../../assets/img/markers/svg/00FF00.svg";
import SVGcolor10 from "../../assets/img/markers/svg/00FF40.svg";
import SVGcolor11 from "../../assets/img/markers/svg/00FF80.svg";
import SVGcolor12 from "../../assets/img/markers/svg/00FFBF.svg";
import SVGcolor13 from "../../assets/img/markers/svg/00FFFF.svg";
import SVGcolor14 from "../../assets/img/markers/svg/00BFFF.svg";
import SVGcolor15 from "../../assets/img/markers/svg/0080FF.svg";
import SVGcolor16 from "../../assets/img/markers/svg/0040FF.svg";
import SVGcolor17 from "../../assets/img/markers/svg/0000FF.svg";
import SVGcolor18 from "../../assets/img/markers/svg/4000FF.svg";
import SVGcolor19 from "../../assets/img/markers/svg/8000FF.svg";
import SVGcolor20 from "../../assets/img/markers/svg/BF00FF.svg";
import SVGcolor21 from "../../assets/img/markers/svg/FF00FF.svg";
import SVGcolor22 from "../../assets/img/markers/svg/FF00BF.svg";
import SVGcolor23 from "../../assets/img/markers/svg/FF0080.svg";
import SVGcolor24 from "../../assets/img/markers/svg/FF0040.svg";
import SVGcolor25 from "../../assets/img/markers/svg/FF8080.svg";
import SVGcolor26 from "../../assets/img/markers/svg/FFC0C0.svg";
import SVGcolor27 from "../../assets/img/markers/svg/FFFFC0.svg";
import SVGcolor28 from "../../assets/img/markers/svg/C0FFC0.svg";
import SVGcolor29 from "../../assets/img/markers/svg/C0C0FF.svg";
import SVGcolor30 from "../../assets/img/markers/svg/FFC0FF.svg";

export const initialRegData = {
    name: "",
    second_name: "",
    email: "",
    info: "",
    prefered_map: "google",
    phone: "",
    password: "",
    password_confirmation: "",
    // user_balance: "",
    legal_adress: "",
    post_adress: "",
    business_type: 0,
    unp: "",
    bank_info: "",
    bank_account: ""
    
};

export const initialCamera = {
    ip: "",
    model: "",
    login: "",
    password: "",
    name: "",
    storage_id: null,
    bucket_id: null
};
export const initialStorage = {
    type: "",
    url: "",
    name: "",
    aws_access_key_id: "",
    aws_secret_access_key: ""
};

export const initialSchedule = {
    duration: "0",
    period: "0",
    name: "",
    days: "",
    start_hour: "",
    end_hour: "",
    cameras: []
};

export const initialBucket = { name: "" };

export const cameraFields = [
    { label: "name", key: "name", placeholder: "enter_name" },
    { label: "model", key: "model", placeholder: "enter_model" },
    { label: "ip", key: "ip_address", placeholder: "enter_ip" },
    { label: "login", key: "login", placeholder: "enter_login" },
    { label: "password", key: "password", placeholder: "enter_password" },
    { label: "storage", key: "storage_id", placeholder: "select_storage" },
    { label: "bucket", key: "bucket_id", placeholder: "select_bucket" }
];

export const scheduleFields = [
    { label: "name", key: "name", placeholder: "enter_name" },
    { label: "duration_s", key: "duration", placeholder: "3600" },
    { label: "period_s", key: "period", placeholder: "3600" },
    { label: "days", key: "days" },
    { label: "start_hour", key: "start_hour", placeholder: "enter_time" },
    { label: "end_hour", key: "end_hour", placeholder: "enter_time" },
    { label: "cameras", key: "cameras" }
];

export const createStorageFieldsAWS = [
    { label: "name", key: "name", placeholder: "enter_name" },
    { label: "storage_type", key: "type" },
    { label: "url", key: "url", placeholder: "enter_url" },
    { label: "access_key", key: "aws_access_key_id", placeholder: "enter_access_key" },
    { label: "secret_access_key", key: "aws_secret_access_key", placeholder: "enter_secret_access_key" }
];

export const createStorageFieldsIbaS3 = [
    { label: "name", key: "name", placeholder: "enter_name" },
    { label: "storage_type", key: "type" },
    { label: "url", key: "url", placeholder: "enter_url" },
    { label: "access_key", key: "aws_access_key_id", placeholder: "enter_access_key" },
    { label: "secret_access_key", key: "aws_secret_access_key", placeholder: "enter_secret_access_key" },
    { label: "login", key: "login", placeholder: "enter_login" },
    { label: "password", key: "password", placeholder: "enter_password" },
    { label: "account", key: "account", placeholder: "enter_account" },
    { label: "role", key: "role", placeholder: "enter_role" }

];


export const editStorageFields = [
    { label: "Name", key: "name" },
    { label: "URL", key: "url" },
    { label: "Access key", key: "aws_access_key_id" },
    { label: "Access secret key", key: "aws_secret_access_key" }
];

export const regFields = [
    [
        { label: "name", key: "name", placeholder: "enter_name" },
        { label: "second_name", key: "second_name", placeholder: "enter_second_name" },
        { label: "email", key: "email", placeholder: "enter_email" },
        { label: "info", key: "info", placeholder: "enter_info" },
        { label: "prefered_map", key: "prefered_map", placeholder: "select_map" },
        { label: "phone", key: "phone", placeholder: "enter_phone" },
        { label: "password", key: "password", placeholder: "enter_password" },
        { label: "confirm_pass", key: "password_confirmation", placeholder: "confirm_pass" }
    ],
    [
        { label: "legal_address", key: "legal_address", placeholder: "enter_legal_address" },
        { label: "post_adress", key: "post_address", placeholder: "enter_post_adress" }
    ],
    [
        { label: "ynp", key: "unp", placeholder: "enter_ynp" },
        { label: "bank", key: "bank_info", placeholder: "enter_bank" },
        { label: "rschet", key: "bank_account", placeholder: "enter_bank_account" }
    ]
];

export const editFields = [
    [
        { label: "name", key: "name", placeholder: "enter_name" },
        { label: "second_name", key: "second_name", placeholder: "enter_second_name" },
        { label: "email", key: "email", placeholder: "enter_email" },
        { label: "info", key: "info", placeholder: "enter_info" },
        { label: "prefered_map", key: "prefered_map", placeholder: "select_map" },
        { label: "phone", key: "phone", placeholder: "enter_phone" }
    ],
    [
        { label: "legal_address", key: "legal_address", placeholder: "enter_legal_address" },
        { label: "post_adress", key: "post_address", placeholder: "enter_post_adress" }
    ],
    [
        { label: "ynp", key: "unp", placeholder: "enter_ynp" },
        { label: "bank", key: "bank_info", placeholder: "enter_bank" },
        { label: "rschet", key: "bank_account", placeholder: "enter_bank_account" }
    ]
];

//unused
export const fields = {
    default: [{ label: "Default", name: "default" }],
    create_camera: [
        { label: "Name", key: "name" },
        { label: "Ip", key: "ip" },
        { label: "Login", key: "login" },
        { label: "Password", key: "password" },
        { label: "Storage", key: "storage_id" },
        { label: "Bucket", key: "bucket_id" }
    ],
    edit_camera: [
        { label: "Name", key: "name" },
        { label: "Ip", key: "ip" },
        { label: "Login", key: "login" },
        { label: "Password", key: "password" },
        { label: "Storage", key: "storage_id" },
        { label: "Bucket", key: "bucket_id" }
    ],
    create_storage: [
        { label: "Name", key: "name" },
        { label: "Storage Type", key: "storage_type" },
        { label: "URL", key: "url" },
        { label: "Access key", key: "aws_access_key_id" },
        { label: "Access secret key", key: "aws_secret_access_key" },
        { label: "Login", key: "login" },
        { label: "Password", key: "password" }
    ],
    edit_storage: [
        { label: "Name", key: "name" },
        { label: "URL", key: "url" },
        { label: "Access key", key: "aws_access_key_id" },
        { label: "Access secret key", key: "aws_secret_access_key" }
    ],
    create_schedule: [
        { label: "Name", key: "name" },
        { label: "Duration, s", key: "duration" },
        { label: "Period, s", key: "period" },
        { label: "Days", key: "days" },
        { label: "Start Hour", key: "start_hour" },
        { label: "End Hour", key: "end_hour" },
        { label: "Cameras", key: "cameras" }
    ],
    edit_schedule: [
        { label: "Name", key: "name" },
        { label: "Duration, s", key: "duration" },
        { label: "Period, s", key: "period" },
        { label: "Days", key: "days" },
        { label: "Start Hour", key: "start_hour" },
        { label: "End Hour", key: "end_hour" }
    ],
    create_bucket: [{ label: "Name", key: "name" }]
};

export const daysOfWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
};

export const daysOfWeekArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const initialCheckedDays = [
    { num: 1, checked: false, day: "Monday" },
    { num: 2, checked: false, day: "Tuesday" },
    { num: 3, checked: false, day: "Wednesday" },
    { num: 4, checked: false, day: "Thursday" },
    { num: 5, checked: false, day: "Friday" },
    { num: 6, checked: false, day: "Saturday" },
    { num: 7, checked: false, day: "Sunday" }
];

export const initalTracker = {
    name: "",
    imei: "",
    phone: "",
    port: "5000",
    info: "",
    average_consumption: "",
    tracker_model_id: "",
    stopping_time: "",
    parking_time: "",
    color: ""
};

export const trackerDetails = {
    imei: "tracker_imei",
    phone: "tracker_phone",
    port: "port",
    info: "tracker_info",
    average_consumption: "tracker_average_consumption",
    tracker_model_id: "tracker_model",
    stopping_time: "tracker_stopping_time",
    parking_time: "tracker_parking_time",
    paid_till: "paid_up_to",
    color: "tracker_color"
};

export const initalTrackerFields = [
    { name: "name", label: "tracker_name", placeholder: "enter_tracker_name" },
    { name: "tracker_model_id", label: "tracker_model", placeholder: "enter_tracker_model" },
    { name: "imei", label: "tracker_imei", placeholder: "enter_tr_imei" },
    { name: "phone", label: "tracker_phone", placeholder: "enter_tracker_phone" },
    { name: "port", label: "port", placeholder: "enter_port" },
    { name: "average_consumption", label: "tracker_average_consumption", placeholder: "enter_tracker_average_consuption" },
    { name: "stopping_time", label: "tracker_stopping_time", placeholder: "enter_tracker_stopping_time" },
    { name: "info", label: "tracker_info", placeholder: "enter_tracker_info" },
    { name: "parking_time", label: "tracker_parking_time", placeholder: "enter_tracker_parking_time" }
];

export const initMonitoringObj = {
    name: "",
    description: "",
    picture: ""
};

export const initSharedObjectUser = {
    email: "",
    mon_object_edit: false,
    camera_edit: false,
    tracker_edit: false

    // change_tro_access: false,
    // reports_access: false,
    // routes_creating_access: false,
    // realtime_check_access: false,
    // schedules_access: false,
    // storage_access: false,
    // broadcast_access: false,
    // change_cam_access: false,
    // recorded_videos_manage_access: false
};

export const initSharedTrackerUser = {
    email: "",
    edit: false
};

export const initSharedCameraUser = {
    email: "",
    edit: false
};

export const initObjectSharingFields = [
    ["access_to_edit_mon_object", "mon_object_edit"],
    ["access_to_edit_camera", "camera_edit"],
    ["access_to_edit_tracker", "tracker_edit"]

    
    // "change_tracker_access",
    // "reports_access",
    // "routes_creating_access",
    // "realtime_check_access",
    // "schedules_access",
    // "storage_access",
    // "broadcast_access",
    // "change_camera_access",
    // "recorded_videos_manage_access",
    // "show_access"
];

export const initTrackerSharingFields = [["access_to_edit_tracker", "edit"]];

export const initCameraSharingFields = [
    // "schedules_access",
    // "storage_access",
    // "broadcast_access",
    ["access_to_edit_camera", "edit"]
    // "recorded_videos_manage_access",
    // "show_access"
];

export const paletteColors = [
    "#FF0000",
    "#FF4000",
    "#FF8000",
    "#FFBF00",
    "#FFFF00",
    "#BFFF00",
    "#80FF00",
    "#40FF00",
    "#00FF00",
    "#00FF40",
    "#00FF80",
    "#00FFBF",
    "#00FFFF",
    "#00BFFF",
    "#0080FF",
    "#0040FF",
    "#0000FF",
    "#4000FF",
    "#8000FF",
    "#BF00FF",
    "#FF00FF",
    "#FF00BF",
    "#FF0080",
    "#FF0040",
    "#FF8080",
    "#FFC0C0",
    "#FFFFC0",
    "#C0FFC0",
    "#C0C0FF",
    "#FFC0FF"
];

export const paletteColorsUrls = {
    FF0000: color1,
    FF4000: color2,
    FF8000: color3,
    FFBF00: color4,
    FFFF00: color5,
    BFFF00: color6,
    "80FF00": color7,
    "40FF00": color8,
    "00FF00": color9,
    "00FF40": color10,
    "00FF80": color11,
    "00FFBF": color12,
    "00FFFF": color13,
    "00BFFF": color14,
    "0080FF": color15,
    "0040FF": color16,
    "0000FF": color17,
    "4000FF": color18,
    "8000FF": color19,
    BF00FF: color20,
    FF00FF: color21,
    FF00BF: color22,
    FF0080: color23,
    FF0040: color24,
    FF8080: color25,
    FFC0C0: color26,
    FFFFC0: color27,
    C0FFC0: color28,
    C0C0FF: color29,
    FFC0FF: color30
};

export const paletteColorsSVGUrls = {
    FF0000: SVGcolor1,
    FF4000: SVGcolor2,
    FF8000: SVGcolor3,
    FFBF00: SVGcolor4,
    FFFF00: SVGcolor5,
    BFFF00: SVGcolor6,
    "80FF00": SVGcolor7,
    "40FF00": SVGcolor8,
    "00FF00": SVGcolor9,
    "00FF40": SVGcolor10,
    "00FF80": SVGcolor11,
    "00FFBF": SVGcolor12,
    "00FFFF": SVGcolor13,
    "00BFFF": SVGcolor14,
    "0080FF": SVGcolor15,
    "0040FF": SVGcolor16,
    "0000FF": SVGcolor17,
    "4000FF": SVGcolor18,
    "8000FF": SVGcolor19,
    BF00FF: SVGcolor20,
    FF00FF: SVGcolor21,
    FF00BF: SVGcolor22,
    FF0080: SVGcolor23,
    FF0040: SVGcolor24,
    FF8080: SVGcolor25,
    FFC0C0: SVGcolor26,
    FFFFC0: SVGcolor27,
    C0FFC0: SVGcolor28,
    C0C0FF: SVGcolor29,
    FFC0FF: SVGcolor30
};

export const initialNotification = {
    title: "",
    text: "",
    type: "info",
    users: []
};

export const initialAdminUserItems = [
    "name", //common
    "business_type", //common
    "email", //common
    "active", //common
    "phone", //common
    "info", //common
    "balance", //common
    // "user_vip", //old
    "legal_adress", //ur &
    "post_adress", //ur &
    "unp", //ur
    "bank_account", //ur
    "bank_info", //ur
    "created_at", //common
    "prefered_map" //common
];

export const updateUserFields = [
    [
        { label: "name", key: "name", placeholder: "enter_name" },
        { label: "second_name", key: "second_name", placeholder: "enter_second_name" },
        { label: "email", key: "email", placeholder: "enter_email" },
        { label: "prefered_map", key: "prefered_map", placeholder: "select_map" },
        { label: "info", key: "info", placeholder: "enter_info" },
        { label: "phone", key: "phone", placeholder: "enter_phone" },
        { label: "legal_address", key: "legal_address", placeholder: "enter_legal_address" }
    ],
    [{ label: "post_adress", key: "post_address", placeholder: "enter_post_adress" }],
    [
        { label: "ynp", key: "unp", placeholder: "enter_ynp" },
        { label: "bank", key: "bank_info", placeholder: "enter_bank" },
        { label: "rschet", key: "bank_account", placeholder: "enter_bank_account" }
    ]
];

export const tariffsTrackersDescriptions = [
    "",
    "max_routes",
    "price",
    "history",
    "mileage_calculation",
    "consumption_calculation",
    "stops_summary",
    "max_trackers",
    "realtime_mode",
    "mileage_summary",
    "credit_days",
    "discount6",
    "discount12"
];

export const tariffTrackerDatafields = [
    { name: "name", boolean: false },
    { name: "max_routes", boolean: false },
    { name: "price", boolean: false },
    { name: "history", boolean: false },
    { name: "mileage_calculation", boolean: true },
    { name: "consumption_calculation", boolean: true },
    { name: "stops_summary", boolean: true },
    { name: "max_trackers", boolean: false },
    { name: "realtime_mode", boolean: true },
    { name: "mileage_summary", boolean: true },
    { name: "credit_days", boolean: false },
    { name: "discount6", boolean: false },
    { name: "discount12", boolean: false }
];

export const tariffsCamerasDescriptions = [
    "",
    "price",
    "schedules",
    "max_cameras",
    "realtime_mode",
    "credit_days",
    "discount6",
    "discount12"
];

export const tariffCameraDatafields = [
    { name: "name", boolean: false },
    { name: "price", boolean: false },
    { name: "schedules_right", boolean: true },
    { name: "max_cameras", boolean: false },
    { name: "realtime_mode", boolean: true },
    { name: "credit_days", boolean: false },
    { name: "discount6", boolean: false },
    { name: "discount12", boolean: false }
];

export const initTrackerTariff = {
    name: "",
    max_routes: "",
    price: "",
    history: "",
    mileage_calculation: false,
    consumption_calculation: false,
    stops_summary: false,
    max_trackers: "",
    realtime_mode: false,
    mileage_summary: false,
    credit_days: "",
    discount6: "",
    discount12: ""
};

export const initCameraTariff = {
    name: "",
    price: "",
    schedules: false,
    max_cameras: "",
    realtime_mode: false,
    credit_days: "",
    discount6: "",
    discount12: ""
};

export const initGoogleOptions = {
    center: { lat: 53.902235, lng: 27.561828 },
    zoom: 6
};

export const initTrackerModel = {
    name: "",
    code: ""
};

export const initialProlongTracker = {
    tracker_tariff_id: null,
    tracker_id: "",
    month_amount: 1
};

export const initialProlongCamera = {
    camera_tariff_id: null,
    camera_id: "",
    month_amount: 1
};
