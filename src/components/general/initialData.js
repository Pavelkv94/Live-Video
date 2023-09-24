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
    user_session_lifetime: "600000",
    user_name: "",
    user_mail: "",
    user_info: "",
    prefered_map: "google",
    user_phone: "",
    user_pass: "",
    user_pass_confirmation: "",
    // user_balance: "",
    user_uradress: "",
    user_postadress: "",
    user_fiz_ur: "",
    user_ynp: "",
    user_bank: "",
    user_rschet: ""
};

export const initialCamera = {
    ip: "",
    login: "",
    password: "",
    name: "",
    storage_id: null,
    bucket_id: null
};
export const initialStorage = {
    storage_type: "",
    url: "",
    name: "",
    aws_access_key_id: "",
    aws_secret_access_key: "",
    login: "",
    password: ""
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
    { label: "name", key: "name", placeholder: "enterName" },
    { label: "ip", key: "ip", placeholder: "enterIp" },
    { label: "login", key: "login", placeholder: "enterLogin" },
    { label: "password", key: "password", placeholder: "enterPassword" },
    { label: "storage", key: "storage_id", placeholder: "selectStorage" },
    { label: "bucket", key: "bucket_id", placeholder: "selectBucket" }
];

export const scheduleFields = [
    { label: "name", key: "name", placeholder: "enterName" },
    { label: "durationS", key: "duration", placeholder: "3600" },
    { label: "periodS", key: "period", placeholder: "3600" },
    { label: "days", key: "days" },
    { label: "startHour", key: "start_hour", placeholder: "enterTime" },
    { label: "endHour", key: "end_hour", placeholder: "enterTime" },
    { label: "cameras", key: "cameras" }
];

export const createStorageFields = [
    { label: "name", key: "name", placeholder: "enterName" },
    { label: "storageType", key: "storage_type" },
    { label: "url", key: "url", placeholder: "enterUrl" },
    { label: "accesskey", key: "aws_access_key_id", placeholder: "enterAccessKey" },
    { label: "secretAccessKey", key: "aws_secret_access_key", placeholder: "enterSecretAccessKey" },
    { label: "login", key: "login", placeholder: "enterLogin" },
    { label: "password", key: "password", placeholder: "enterPassword" }
];

export const editStorageFields = [
    { label: "Name", key: "name" },
    { label: "URL", key: "url" },
    { label: "Access key", key: "aws_access_key_id" },
    { label: "Access secret key", key: "aws_secret_access_key" }
];

export const regFields = [
    [
        { label: "common.name", key: "user_name", placeholder: "common.enterName" },
        { label: "common.email", key: "user_mail", placeholder: "common.enterEmail" },
        { label: "login.info", key: "user_info", placeholder: "login.enterInfo" },
        { label: "login.preferedMap", key: "prefered_map", placeholder: "login.selectMap" },
        { label: "common.phone", key: "user_phone", placeholder: "common.enterPhone" },
        { label: "login.password", key: "user_pass", placeholder: "login.enterPass" },
        { label: "login.confirmPass", key: "user_pass_confirmation", placeholder: "login.confirmPass" }
    ],
    [
        { label: "login.urAdress", key: "user_uradress", placeholder: "login.enterUrAdress" },
        { label: "login.postAdress", key: "user_postadress", placeholder: "login.enterPostAdress" }
    ],
    [
        { label: "login.ynp", key: "user_ynp", placeholder: "login.enterYnp" },
        { label: "login.bank", key: "user_bank", placeholder: "login.enterBank" },
        { label: "login.rschet", key: "user_rschet", placeholder: "login.enterRschet" }
    ]
];

export const editFields = [
    [
        { label: "common.name", key: "user_name", placeholder: "common.enterName" },
        { label: "common.email", key: "user_mail", placeholder: "common.enterEmail" },
        { label: "login.info", key: "user_info", placeholder: "login.enterInfo" },
        { label: "login.preferedMap", key: "prefered_map", placeholder: "login.selectMap" },
        { label: "common.phone", key: "user_phone", placeholder: "common.enterPhone" }
    ],
    [
        { label: "login.urAdress", key: "user_uradress", placeholder: "login.enterUrAdress" },
        { label: "login.postAdress", key: "user_postadress", placeholder: "login.enterPostAdress" }
    ],
    [
        { label: "login.ynp", key: "user_ynp", placeholder: "login.enterYnp" },
        { label: "login.bank", key: "user_bank", placeholder: "login.enterBank" },
        { label: "login.rschet", key: "user_rschet", placeholder: "login.enterRschet" }
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
    trobject_name: "",
    trobject_imei: "",
    trobject_phone: "",
    trobject_public: "",
    trobject_info: "",
    trobject_srrashod: "",
    trobject_ref_trmodel: "",
    trobject_timestop: "",
    trobject_timepark: "",
    color: ""
};

export const trackerDetails = {
    trobject_imei: "tr_imei",
    trobject_phone: "tr_phone",
    trobject_public: "tr_public",
    trobject_info: "tr_info",
    trobject_srrashod: "tr_srrashod",
    trobject_ref_trmodel: "tr_ref_trmodel",
    trobject_timestop: "tr_timestop",
    trobject_timepark: "tr_timepark",
    trobject_oplacheno: "tr_paid",
    color: "trackerColor"
};

export const initalTrackerFields = [
    { name: "trobject_name", label: "trackerManagement.tr_name", placeholder: "trackerManagement.enter_tr_name" },
    { name: "trobject_public", label: "trackerManagement.tr_public", placeholder: "trackerManagement.enter_tr_public" },
    { name: "trobject_imei", label: "trackerManagement.tr_imei", placeholder: "trackerManagement.enter_tr_imei" },
    { name: "trobject_phone", label: "trackerManagement.tr_phone", placeholder: "trackerManagement.enter_tr_phone" },
    { name: "trobject_info", label: "trackerManagement.tr_info", placeholder: "trackerManagement.enter_tr_info" },
    { name: "trobject_srrashod", label: "trackerManagement.tr_srrashod", placeholder: "trackerManagement.enter_tr_srrashod" },
    { name: "trobject_timestop", label: "trackerManagement.tr_timestop", placeholder: "trackerManagement.enter_tr_timestop" },
    { name: "trobject_timepark", label: "trackerManagement.tr_timepark", placeholder: "trackerManagement.enter_tr_timepark" },
    { name: "trobject_ref_trmodel", label: "trackerManagement.tr_ref_trmodel", placeholder: "trackerManagement.enter_tr_ref_trmodel" }
];

export const initMonitoringObj = {
    name: "",
    description: "",
    picture: ""
};

export const initSharedObjectUser = {
    email: "",
    change_tro_access: false,
    reports_access: false,
    routes_creating_access: false,
    realtime_check_access: false,
    schedules_access: false,
    storage_access: false,
    broadcast_access: false,
    change_cam_access: false,
    recorded_videos_manage_access: false
};

export const initSharedTrackerUser = {
    email: "",
    change_access: false,
    reports_access: false,
    routes_creating_access: false,
    realtime_check_access: false
};

export const initSharedCameraUser = {
    email: "",
    schedules_access: false,
    storage_access: false,
    broadcast_access: false,
    change_access: false,
    recorded_videos_manage_access: false
};

export const initObjectSharingFields = [
    "change_tro_access",
    "reports_access",
    "routes_creating_access",
    "realtime_check_access",
    "schedules_access",
    "storage_access",
    "broadcast_access",
    "change_cam_access",
    "recorded_videos_manage_access",
    "show_access"
];

export const initTrackerSharingFields = ["change_access", "reports_access", "routes_creating_access", "realtime_check_access", "show_access"];

export const initCameraSharingFields = [
    "schedules_access",
    "storage_access",
    "broadcast_access",
    "change_access",
    "recorded_videos_manage_access",
    "show_access"
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
    "user_name", //common
    "user_fiz_ur", //common
    "user_mail", //common
    "user_mail_verif", //common
    "user_phone", //common
    "user_info", //common
    "user_balance", //common
    // "user_vip", //old
    "user_uradress", //ur &
    "user_postadress", //ur &
    "user_ynp", //ur
    "user_rschet", //ur
    "user_bank", //ur
    "user_regtime", //common
    "prefered_map" //common
];

export const initTestTariff = {
    tariffobj_active: 1,
    tariffobj_publicspec: 1,
    tariffobj_ref_user: 4,
    tariffobj_sort: 1,
    tariffobj_name: "Tariff name",
    tariffobj_objstat: 1,
    tariffobj_objdin: 1,
    tariffobj_publicobj: 1,
    tariffobj_objstat_cost: 1,
    tariffobj_objdin_cost: 1,
    tariffobj_public_cost: 1,
    tariffobj_trekcountobj: 1,
    tariffobj_probeg: 1,
    tariffobj_history: 1,
    tariffobj_trekvideo: 1,
    tariffobj_toplivo: 1,
    tariffobj_geozone: 1,
    tariffobj_simcard: 1,
    tariffobj_stops: 1,
    tariffobj_reportprobeg: 1,
    tariffobj_reportprobeggr: 1,
    tariffobj_discount6m: 1,
    tariffobj_discount1y: 1,
    tariffobj_phonelogin: 1,
    tariffobj_realtime: 1,
    tariffobj_creditdays: 1
};

export const updateUserFields = [
    [
        { label: "common.name", key: "user_name", placeholder: "common.enterName" },
        { label: "common.email", key: "user_mail", placeholder: "common.enterEmail" },
        { label: "login.preferedMap", key: "prefered_map", placeholder: "login.selectMap" },
        { label: "login.info", key: "user_info", placeholder: "login.enterInfo" },
        { label: "common.phone", key: "user_phone", placeholder: "common.enterPhone" },
        { label: "login.urAdress", key: "user_uradress", placeholder: "login.enterUrAdress" }
    ],
    [{ label: "login.postAdress", key: "user_postadress", placeholder: "login.enterPostAdress" }],
    [
        { label: "login.ynp", key: "user_ynp", placeholder: "login.enterYnp" },
        { label: "login.bank", key: "user_bank", placeholder: "login.enterBank" },
        { label: "login.rschet", key: "user_rschet", placeholder: "login.enterRschet" }
    ]
];

export const tariffsDescriptions = [
    "",
    "tariffs.tariffobj_objdin",
    "tariffs.tariffobj_objdin_cost",
    "tariffs.tariffobj_history",
    "tariffs.tariffobj_probeg",
    "tariffs.tariffobj_toplivo",
    "tariffs.tariffobj_stops",
    "tariffs.tariffobj_trekcountobj",
    "tariffs.tariffobj_realtime",
    "tariffs.tariffobj_reportprobeg",
    "tariffs.tariffobj_creditdays",
    "tariffs.tariffobj_discount6m",
    "tariffs.tariffobj_discount1y"
];

export const tariffDatafields = [
    { name: "tariffobj_name", boolean: false },
    { name: "tariffobj_objdin", boolean: false },
    { name: "tariffobj_objdin_cost", boolean: false },
    { name: "tariffobj_history", boolean: false },
    { name: "tariffobj_probeg", boolean: true },
    { name: "tariffobj_toplivo", boolean: true },
    { name: "tariffobj_stops", boolean: true },
    { name: "tariffobj_trekcountobj", boolean: false },
    { name: "tariffobj_realtime", boolean: true },
    { name: "tariffobj_reportprobeg", boolean: true },
    { name: "tariffobj_creditdays", boolean: false },
    { name: "tariffobj_discount6m", boolean: false },
    { name: "tariffobj_discount1y", boolean: false }
];

export const initTariff = {
    tariffobj_name: "",
    tariffobj_objdin: "",
    tariffobj_objdin_cost: "",
    tariffobj_history: "",
    tariffobj_probeg: false,
    tariffobj_toplivo: false,
    tariffobj_stops: false,
    tariffobj_trekcountobj: "",
    tariffobj_realtime: false,
    tariffobj_reportprobeg: false,
    tariffobj_creditdays: "",
    tariffobj_discount6m: "",
    tariffobj_discount1y: ""
};

export const initGoogleOptions = {
    center: { lat: 53.902235, lng: 27.561828 },
    zoom: 10
};

export const initTrackerModel = {
    trmodel_name: "",
    trmodel_code: ""
};

export const initialProlongTracker = {
    tariff_id: "",
    month_amount: 1
};
