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
    status: "disabled",
    duration: "0",
    frequency: "0",
    name: "",
    start_day: "",
    end_day: "",
    start_hour: "",
    end_hour: "",
    storage_id: null,
    bucket_id: null,
    cameras: [],
};

export const fields = {
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
        { label: "Status", key: "status" },
        { label: "Duration", key: "duration" },
        { label: "Frequency", key: "frequency" },
        { label: "Start Day", key: "start_day" },
        { label: "End Day", key: "end_day" },
        { label: "Start Hour", key: "start_hour" },
        { label: "End Hour", key: "end_hour" },
        { label: "Storage", key: "storage_id" },
        { label: "Bucket", key: "bucket_id" },
        { label: "Cameras", key: "cameras" },
    ],
};