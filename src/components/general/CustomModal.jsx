import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCamera, updateCamera } from "../../redux/camerasReducer";
import { createStorage, updateStorage } from "../../redux/storagesReducer";

export const CustomModal = React.memo(
    ({ open, setOpen, flag, checkedElement }) => {
        const dispatch = useDispatch();
        const user = useSelector((state) => state.authReducer.user);
        const initialCamera = {
            ip: "",
            login: "",
            password: "",
            name: "",
            storage_id: "",
            bucket_id: "",
        };
        const [cameraData, setCameraData] = useState(initialCamera);

        const initialStorage = {
            storage_type: "",
            url: "",
            name: "",
            aws_access_key_id: "",
            aws_secret_access_key: "",
        };
        const [storageData, setStorageData] = useState(initialStorage);

        useEffect(() => {
            flag === "edit_camera" && setCameraData(checkedElement);
            flag === "edit_storage" && setStorageData(checkedElement);
        }, [flag]);

        const fields = {
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
        };

        const handleOk = (flag) => {
            if (flag === "create_camera") {
                dispatch(createCamera(cameraData, user.id));
            } else if (flag === "edit_camera") {
                dispatch(updateCamera(cameraData, cameraData.key, user.id));
            } else if (flag === "create_storage") {
                dispatch(createStorage(storageData, user.id));
            } else if (flag === "edit_storage") {
                dispatch(updateStorage(storageData, storageData.key, user.id));
            }
           
            setOpen(false);
            setCameraData(initialCamera);
            setStorageData(initialStorage)
        };

        const handleCancel = () => {
            setOpen(false);
        };

        return (
            <Modal
                title={
                    flag === "create_camera" ? "Add New Camera" : "Edit Camera"
                }
                visible={open}
                onOk={
                    () => handleOk(flag)
                    // flag === "create_camera"
                    //     ? createCameraHandler
                    //     : saveCameraHandler
                }
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button
                        key="ok"
                        onClick={
                            () => handleOk(flag)
                            // flag === "create_camera"
                            //     ? createCameraHandler
                            //     : saveCameraHandler
                        }
                        type="primary"
                        // disabled={!regData.password || !regData.email}
                    >
                        {flag === "create_camera" ? "Create" : "Save"}
                    </Button>,
                ]}
            >
                {fields[flag].map((el, index) => (
                    <div className="register-field" key={index}>
                        <p>{el.label}</p>
                        {(flag === "create_camera" ||
                            flag === "edit_camera") && (
                            <Input
                                value={cameraData[el.key]}
                                onChange={(e) => {
                                    setCameraData({
                                        ...cameraData,
                                        [el.key]: e.currentTarget.value,
                                    });
                                }}
                            />
                        )}
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
                    </div>
                ))}
                {/* <div className="register-field">
            <p>User Name:</p>
            <Input
                // value={regData.email}
                onChange={(e) =>{}}
            />
        </div>
        <div className="register-field">
            <p>Password</p>
            <Input.Password
                // value={regData.password}
                onChange={(e) =>{}}
            />
        </div> */}
            </Modal>
        );
    }
);
