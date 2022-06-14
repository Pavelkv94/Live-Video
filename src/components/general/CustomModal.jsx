import { Button, Input, InputNumber, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createCamera,
    fetchCameras,
    updateCamera,
} from "../../redux/camerasReducer";
import { createSchedule } from "../../redux/schedulesReducer";
import {
    createStorage,
    fetchBuckets,
    fetchBucketsAction,
    fetchStorages,
    updateStorage,
} from "../../redux/storagesReducer";
import {
    fields,
    initialCamera,
    initialSchedule,
    initialStorage,
} from "./initialData";
import "./CustomModal.css";

const { Option } = Select;

export const CustomModal = React.memo(
    ({ open, setOpen, flag, checkedElement }) => {
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

        useEffect(() => {
            flag === "edit_camera" && setCameraData(checkedElement);
            flag === "edit_storage" && setStorageData(checkedElement);
            flag === "create_schedule" && dispatch(fetchCameras(user.id));
        }, [flag]);

        useEffect(() => {
            dispatch(fetchStorages(user.id));
        }, []);

        useEffect(() => {
            cameraData.storage_id ? dispatch(fetchBuckets(cameraData.storage_id)) : dispatch(fetchBucketsAction([]))
        }, [cameraData]);

        // console.log(cameraData) //!========================
        const handleOk = (flag) => {
            if (flag === "create_camera") {
                dispatch(createCamera(cameraData, user.id));
            } else if (flag === "edit_camera") {
                dispatch(updateCamera(cameraData, cameraData.key, user.id));
            } else if (flag === "create_storage") {
                dispatch(createStorage(storageData, user.id));
            } else if (flag === "edit_storage") {
                dispatch(updateStorage(storageData, storageData.key, user.id));
            } else if (flag === "create_schedule") {
                dispatch(createSchedule(scheduleData, user.id));
            }

            setCameraData(initialCamera);
            setStorageData(initialStorage);
            setScheduleData(initialSchedule);
            setOpen(false);
        };

        const handleCancel = () => {
            setCameraData(initialCamera);
            setStorageData(initialStorage);
            setScheduleData(initialSchedule);
            setOpen(false);
        };

        const optionsCameras = camerasList.map((el) => (
            <Option key={el.id}>{el.name}</Option>
        ));
        const optionsStorages = storagesList.map((el) => (
            <Option key={el.id}>{el.name}</Option>
        ));
        const optionsStatus = ["disabled", "recording"].map((el) => (
            <Option key={el} className={`option-${el}`}>
                {el}
            </Option>
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
            } else if (key === "duration" || key === "frequency") {
                return (
                    <InputNumber
                        style={{ width: "40%" }}
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
            } else if (key === "status") {
                return (
                    <Select
                        allowClear
                        style={{
                            width: "100%",
                            color: `${
                                scheduleData[key] === "disabled"
                                    ? "red"
                                    : "green"
                            }`,
                        }}
                        placeholder="Please select"
                        defaultValue={scheduleData[key]}
                        onChange={(value) =>
                            setScheduleData({
                                ...scheduleData,
                                [key]: value,
                            })
                        }
                    >
                        {optionsStatus}
                    </Select>
                );
            } else if (key === "storage_id") {
                return (
                    <Select
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select"
                        defaultValue={scheduleData[key]}
                        onChange={(value) =>
                            setScheduleData({
                                ...scheduleData,
                                [key]: value,
                            })
                        }
                    >
                        {optionsStorages}
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

        return (
            <Modal
                title="Create/Edit"
                className={flag === "create_schedule" ? "schedules-modal" : ""}
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
                        flag === "create_schedule"
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
                            flag === "edit_storage") && (
                            <Input
                                value={storageData[el.key]}
                                onChange={(e) => {
                                    setStorageData({
                                        ...storageData,
                                        [el.key]: e.currentTarget.value,
                                    });
                                }}
                            />
                        )}
                        {(flag === "create_schedule" ||
                            flag === "edit_schedule") &&
                            scedulesFields(el.key)}
                    </div>
                ))}
            </Modal>
        );
    }
);
