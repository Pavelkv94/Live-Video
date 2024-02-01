import { Button, Checkbox, Col, Input, InputNumber, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCamera, fetchCameras, updateCamera } from "../../redux/camerasReducer";
import { createSchedule, updateSchedule } from "../../redux/schedulesReducer";
import { createBucket, createStorage, fetchBuckets, fetchStorages, updateStorage } from "../../redux/storagesReducer";
import { fields, initialBucket, initialCamera, initialCheckedDays, initialSchedule, initialStorage } from "../general/initialData";
import "./CustomModal.scss";
import { useParams } from "react-router";

const { Option } = Select;

export const CustomModal = React.memo(({ open, setOpen, flag, setFlag, checkedElement, t }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const camerasList = useSelector((state) => state.camerasReducer.camerasList);
    const storagesList = useSelector((state) => state.storagesReducer.storagesList);
    const bucketsList = useSelector((state) => state.storagesReducer.bucketsList);
    const storage = useSelector((state) => state.storagesReducer.currentStorage);
    const bucket = useSelector((state) => state.storagesReducer.currentBucket);

    const [cameraData, setCameraData] = useState(initialCamera);
    const [storageData, setStorageData] = useState(initialStorage);
    const [scheduleData, setScheduleData] = useState(initialSchedule);
    const [bucketData, setBucketData] = useState(initialBucket);
    const [checkedDays, setCheckedDays] = useState(initialCheckedDays);

    useEffect(() => {
        flag === "edit_camera" && setCameraData(checkedElement);
        flag === "edit_storage" && setStorageData(checkedElement);
        flag === "edit_schedule" && setScheduleData(checkedElement);
        flag === "edit_schedule" &&
      checkedElement.days &&
      setCheckedDays(
          checkedDays.map((el) => ({
              ...el,
              checked: checkedElement.days
                  .split(",")
                  .map((d) => +d)
                  .includes(el.num)
          }))
      );
        flag === "create_schedule" && dispatch(fetchCameras(user.id));
    }, [flag]);

    useEffect(() => {
        dispatch(fetchStorages(user.id));
    }, []);

    useEffect(() => {
        (flag === "edit_camera" || flag === "create_camera") && cameraData.storage_id && dispatch(fetchBuckets(cameraData.storage_id));
    }, [cameraData, flag]);

    const handleOk = (flag) => {
        if (flag === "create_camera") {
            dispatch(createCamera(cameraData));
        } else if (flag === "edit_camera") {
            dispatch(updateCamera(cameraData, cameraData.id));
        } else if (flag === "create_storage") {
            dispatch(createStorage({...storageData, user_id: user.id}));
        } else if (flag === "edit_storage") {
            dispatch(updateStorage(storageData, storageData.id, user.id));
        } else if (flag === "create_schedule") {
            dispatch(
                createSchedule(
                    {
                        ...scheduleData,
                        days: checkedDays
                            .filter((el) => el.checked)
                            .map((el) => el.num)
                            .join(","),
                        start_hour: scheduleData.start_hour === "" ? null : scheduleData.start_hour,
                        end_hour: scheduleData.end_hour === "" ? null : scheduleData.end_hour
                    }
                )
            );
        } else if (flag === "edit_schedule") {
            dispatch(
                updateSchedule(
                    {
                        ...scheduleData,
                        days:
              scheduleData.days === ""
                  ? null
                  : checkedDays
                      .filter((el) => el.checked)
                      .map((el) => el.num)
                      .join(","),
                        start_hour: scheduleData.start_hour === "" ? null : scheduleData.start_hour,
                        end_hour: scheduleData.end_hour === "" ? null : scheduleData.end_hour
                    },
                    id
                )
            );
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

    const optionsCameras = camerasList.map((el) => <Option key={el.id}>{el.name}</Option>);
    const optionsStorages = storagesList.map((el) => <Option key={el.id}>{el.name}</Option>);
    //   const storageName = storagesList.filter((el) => el.id == cameraData.storage_id);
    // const optionsStatus = ["disabled", "recording"].map((el) => (
    //     <Option key={el} className={`option-${el}`}>
    //         {el}
    //     </Option>
    // ));
    const optionsStoragesTypes = ["Iba S3", "Aws S3"].map((el) => <Option key={el}>{el}</Option>);

    const optionsBucket = bucketsList.map((el) => <Option key={el.id}>{el.name}</Option>);

    const onChangeDays = (e) => setCheckedDays(checkedDays.map((el) => (el.num === e.target.value ? { ...el, checked: e.target.checked } : el)));

    const disableButton = (flag) => {
        switch (flag) {
        case "create_schedule": {
            if (scheduleData.name == "") {
                return true;
            } else return false;
        }

        default:
            return false;
        }
    };

    
    const scedulesFields = (key) => {
        if (key === "cameras") {
            return (
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: "100%"
                    }}
                    className="cameras-select"
                    placeholder={t("select")}
                    defaultValue={scheduleData[key]}
                    onChange={(value) =>
                        setScheduleData({
                            ...scheduleData,
                            [key]: value
                        })
                    }
                >
                    {optionsCameras}
                </Select>
            );
        } else if (key === "duration" || key === "period") {
            return (
                <InputNumber
                    min={0}
                    value={scheduleData[key]}
                    onChange={(value) => {
                        setScheduleData({
                            ...scheduleData,
                            [key]: value
                        });
                    }}
                />
            );
        } else if (key === "days") {
            return (
                <div>
                    <Row>
                        {checkedDays.map((day, index) => (
                            <Col span={8} key={index}>
                                <Checkbox value={day.num} checked={day.checked} onChange={onChangeDays}>
                                    {day.day}
                                </Checkbox>
                            </Col>
                        ))}
                    </Row>
                </div>
            );
        } else
            return (
                <Input
                    value={scheduleData[key]}
                    onChange={(e) => {
                        setScheduleData({
                            ...scheduleData,
                            [key]: e.currentTarget.value
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
                        width: "100%"
                    }}
                    placeholder={t("select")}
                    defaultValue={flag === "edit_camera" && (key === "storage_id" ? storage.name : bucket.name)}
                    onChange={(value) => {
                        setCameraData({
                            ...cameraData,
                            [key]: value
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
                            [key]: e.currentTarget.value
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
                        width: "100%"
                    }}
                    placeholder={t("select")}
                    defaultValue={cameraData[key]}
                    onChange={(value) => {
                        setStorageData({
                            ...storageData,
                            [key]: value
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
                            [key]: e.currentTarget.value
                        });
                    }}
                />
            );
    };

    return (
        <Modal
            title={flag === "create_camera" || flag === "create_storage" || flag === "create_schedule" || flag === "create_bucket" ? "Create" : "Edit"}
            className={flag === "create_schedule" || flag === "edit_schedule" ? "schedules-modal" : ""}
            open={open}
            onOk={() => handleOk(flag)}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
          Close
                </Button>,
                <Button key="ok" onClick={() => handleOk(flag)} type="primary" disabled={disableButton(flag)}>
                    {flag === "create_camera" || flag === "create_storage" || flag === "create_schedule" || flag === "create_bucket" ? "Create" : "Edit"}
                </Button>
            ]}
        >
            <>
                {fields[flag].map((el, index) => (
                    <div className="register-field" key={index}>
                        <p>{el.label}</p>
                        {(flag === "create_camera" || flag === "edit_camera") && camerasFields(el.key)}
                        {(flag === "create_storage" || flag === "edit_storage") && storageFields(el.key)}
                        {(flag === "create_schedule" || flag === "edit_schedule") && scedulesFields(el.key)}
                        {flag === "create_bucket" && (
                            <Input
                                value={bucketData[el.key]}
                                onChange={(e) => {
                                    setBucketData({
                                        ...bucketData,
                                        [el.key]: e.currentTarget.value
                                    });
                                }}
                            />
                        )}
                    </div>
                ))}
                {(flag === "create_schedule" || flag === "edit_schedule") && (
                    <p className="help">{t("modal_description")}</p>
                )}
            </>
        </Modal>
    );
});
