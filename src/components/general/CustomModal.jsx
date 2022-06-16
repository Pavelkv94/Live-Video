import { Button, Input, InputNumber, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createCamera,
    fetchCameras,
    updateCamera,
} from "../../redux/camerasReducer";
import { createSchedule, updateSchedule } from "../../redux/schedulesReducer";
import {
    createBucket,
    createStorage,
    fetchBuckets,
    fetchBucketsAction,
    fetchStorages,
    updateStorage,
} from "../../redux/storagesReducer";
import {
    fields,
    initialBucket,
    initialCamera,
    initialSchedule,
    initialStorage,
} from "./initialData";
import "./CustomModal.css";
import { useParams } from "react-router";

const { Option } = Select;

export const CustomModal = React.memo(
    ({ open, setOpen, flag, setFlag, checkedElement }) => {
        const { id } = useParams();
        const dispatch = useDispatch();
        const user = useSelector((state) => state.authReducer.user);
        const camerasList = useSelector(
            (state) => state.camerasReducer.camerasList
        );
        const storagesList = useSelector(
            (state) => state.storagesReducer.storagesList
        );
        const bucketsList = useSelector(
            (state) => state.storagesReducer.bucketsList
        );

        const [cameraData, setCameraData] = useState(initialCamera);
        const [storageData, setStorageData] = useState(initialStorage);
        const [scheduleData, setScheduleData] = useState(initialSchedule);
        const [bucketData, setBucketData] = useState(initialBucket);

        const daysOfWeekArray = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];

        useEffect(() => {
            flag === "edit_camera" && setCameraData(checkedElement);
            flag === "edit_storage" && setStorageData(checkedElement);
            flag === "edit_schedule" && setScheduleData(checkedElement);
            flag === "create_schedule" && dispatch(fetchCameras(user.id));
        }, [flag]);

        useEffect(() => {
            dispatch(fetchStorages(user.id));
        }, []);

        useEffect(() => {
            cameraData.storage_id
                ? dispatch(fetchBuckets(cameraData.storage_id))
                : dispatch(fetchBucketsAction([]));
        }, [cameraData]);

        // console.log(scheduleData) //!========================
        const handleOk = (flag) => {
            if (flag === "create_camera") {
                dispatch(createCamera(cameraData, user.id));
            } else if (flag === "edit_camera") {
                dispatch(updateCamera(cameraData, cameraData.id, user.id));
            } else if (flag === "create_storage") {
                dispatch(createStorage(storageData, user.id));
            } else if (flag === "edit_storage") {
                dispatch(updateStorage(storageData, storageData.id, user.id));
            } else if (flag === "create_schedule") {
                dispatch(createSchedule(scheduleData, user.id));
            } else if (flag === "edit_schedule") {
                dispatch(updateSchedule(scheduleData, id));
            } else if (flag === "create_bucket") {
                dispatch(createBucket(bucketData, id));
            }

            setCameraData(initialCamera);
            setStorageData(initialStorage);
            setScheduleData(initialSchedule);
            setBucketData(initialBucket);
            setOpen(false);
        };

        const handleCancel = () => {
            setCameraData(initialCamera);
            setStorageData(initialStorage);
            setScheduleData(initialSchedule);
            setBucketData(initialBucket);
            setFlag("default");
            setOpen(false);
        };

        const optionsCameras = camerasList.map((el) => (
            <Option key={el.id}>{el.name}</Option>
        ));
        const optionsStorages = storagesList.map((el) => (
            <Option key={el.id}>{el.name}</Option>
        ));
        // const optionsStatus = ["disabled", "recording"].map((el) => (
        //     <Option key={el} className={`option-${el}`}>
        //         {el}
        //     </Option>
        // ));
        const optionsStoragesTypes = ["IBA/S3", "Amazon/S3"].map((el) => (
            <Option key={el}>{el}</Option>
        ));

        const optionsDaysOfWeek = daysOfWeekArray.map((el, index) => (
            <Option key={index + 1}>{el}</Option>
        ));

        const optionsBucket = bucketsList.map((el) => (
            <Option key={el.id}>{el.name}</Option>
        ));

        const scedulesFields = (key) => {
            if (key === "cameras") {
                return (
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        className="cameras-select"
                        placeholder="Please select"
                        defaultValue={scheduleData[key]}
                        onChange={(value) =>
                            setScheduleData({
                                ...scheduleData,
                                [key]: value,
                            })
                        }
                    >
                        {optionsCameras}
                    </Select>
                );
            } else if (key === "duration" || key === "period") {
                return (
                    <InputNumber
                        // style={{ width: "40%" }}
                        min={0}
                        value={scheduleData[key]}
                        onChange={(value) => {
                            setScheduleData({
                                ...scheduleData,
                                [key]: value,
                            });
                        }}
                    />
                );
            } else if (key === "start_day" || key === "end_day") {
                return (
                    <Select
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        className="cameras-select"
                        placeholder="Please select"
                        defaultValue={scheduleData[key]}
                        onChange={(value) =>
                            setScheduleData({
                                ...scheduleData,
                                [key]: value,
                            })
                        }
                    >
                        {optionsDaysOfWeek}
                    </Select>
                );
            } else
                return (
                    <Input
                        value={scheduleData[key]}
                        onChange={(e) => {
                            setScheduleData({
                                ...scheduleData,
                                [key]: e.currentTarget.value,
                            });
                        }}
                    />
                );
        };

        const camerasFields = (key) => {
            if (key === "storage_id" || key === "bucket_id") {
                return (
                    <Select
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select"
                        defaultValue={cameraData[key]}
                        onChange={(value) => {
                            setCameraData({
                                ...cameraData,
                                [key]: value,
                            });
                        }}
                    >
                        {key === "storage_id" ? optionsStorages : optionsBucket}
                    </Select>
                );
            } else
                return (
                    <Input
                        value={cameraData[key]}
                        onChange={(e) => {
                            setCameraData({
                                ...cameraData,
                                [key]: e.currentTarget.value,
                            });
                        }}
                    />
                );
        };

        const storageFields = (key) => {
            if (key === "storage_type") {
                return (
                    <Select
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select"
                        defaultValue={cameraData[key]}
                        onChange={(value) => {
                            setStorageData({
                                ...storageData,
                                [key]: value,
                            });
                        }}
                    >
                        {optionsStoragesTypes}
                    </Select>
                );
            } else
                return (
                    <Input
                        value={storageData[key]}
                        onChange={(e) => {
                            setStorageData({
                                ...storageData,
                                [key]: e.currentTarget.value,
                            });
                        }}
                    />
                );
        };

        return (
            <Modal
                title="Create/Edit"
                className={
                    flag === "create_schedule" || flag === "edit_schedule"
                        ? "schedules-modal"
                        : ""
                }
                visible={open}
                onOk={() => handleOk(flag)}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button
                        key="ok"
                        onClick={() => handleOk(flag)}
                        type="primary"
                        // disabled={!regData.password || !regData.email}
                    >
                        {flag === "create_camera" ||
                        flag === "create_storage" ||
                        flag === "create_schedule" ||
                        "create_bucket"
                            ? "Create"
                            : "Save"}
                    </Button>,
                ]}
            >
                {fields[flag].map((el, index) => (
                    <div className="register-field" key={index}>
                        <p>{el.label}</p>
                        {(flag === "create_camera" || flag === "edit_camera") &&
                            camerasFields(el.key)}
                        {(flag === "create_storage" ||
                            flag === "edit_storage") && storageFields(el.key)}
                        {(flag === "create_schedule" ||
                            flag === "edit_schedule") &&
                            scedulesFields(el.key)}
                        {flag === "create_bucket" && (
                            <Input
                                value={bucketData[el.key]}
                                onChange={(e) => {
                                    setBucketData({
                                        ...bucketData,
                                        [el.key]: e.currentTarget.value,
                                    });
                                }}
                            />
                        )}
                    </div>
                ))}
            </Modal>
        );
    }
);
