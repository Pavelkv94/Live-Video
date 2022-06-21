export const initialCamera = {
    ip: "",
    login: "",
    password: "",
    name: "",
    storage_id: null,
    bucket_id: null,
};
export const initialStorage = {
    storage_type: "",
    url: "",
    name: "",
    aws_access_key_id: "",
    aws_secret_access_key: "",
};
export const initialSchedule = {
    duration: "0",
    period: "0",
    name: "",
    days: "",
    start_hour: "",
    end_hour: "",
    cameras: [],
};

export const initialBucket = { name: "" };

export const fields = {
    default: [{ label: "Default", name: "default" }],
    create_camera: [
        { label: "Name", key: "name" },
        { label: "Ip", key: "ip" },
        { label: "Login", key: "login" },
        { label: "Password", key: "password" },
        { label: "Storage", key: "storage_id" },
        { label: "Bucket", key: "bucket_id" },
    ],
    edit_camera: [
        { label: "Name", key: "name" },
        { label: "Ip", key: "ip" },
        { label: "Login", key: "login" },
        { label: "Password", key: "password" },
        { label: "Storage", key: "storage_id" },
        { label: "Bucket", key: "bucket_id" },
    ],
    create_storage: [
        { label: "Name", key: "name" },
        { label: "Storage Type", key: "storage_type" },
        { label: "URL", key: "url" },
        { label: "Access key", key: "aws_access_key_id" },
        { label: "Access secret key", key: "aws_secret_access_key" },
    ],
    edit_storage: [
        { label: "Name", key: "name" },
        { label: "URL", key: "url" },
        { label: "Access key", key: "aws_access_key_id" },
        { label: "Access secret key", key: "aws_secret_access_key" },
    ],
    create_schedule: [
        { label: "Name", key: "name" },
        { label: "Duration, s", key: "duration" },
        { label: "Period, s", key: "period" },
        { label: "Days", key: "days" },
        { label: "Start Hour", key: "start_hour" },
        { label: "End Hour", key: "end_hour" },
        { label: "Cameras", key: "cameras" },
    ],
    edit_schedule: [
        { label: "Name", key: "name" },
        { label: "Duration, s", key: "duration" },
        { label: "Period, s", key: "period" },
        { label: "Days", key: "days" },
        { label: "Start Hour", key: "start_hour" },
        { label: "End Hour", key: "end_hour" },
    ],
    create_bucket: [{ label: "Name", key: "name" }],
};

export const daysOfWeek = {
    "1": "Monday",
    "2": "Tuesday",
    "3" : "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "7": "Sunday"
};

export const daysOfWeekArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export const initialCheckedDays = [
   {num: 1, checked: false, day: "Monday"},
   {num: 2, checked: false, day: "Tuesday"},
   {num: 3, checked: false, day: "Wednesday"},
   {num: 4, checked: false, day: "Thursday"},
   {num: 5, checked: false, day: "Friday"},
   {num: 6, checked: false, day: "Saturday"},
   {num: 7, checked: false, day: "Sunday"}
]