import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCamera, updateCamera } from "../../redux/camerasReducer";

export const CameraModal = React.memo(
    ({ open, setOpen, flag, checkedCamera }) => {
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

        useEffect(() => {
            flag === "edit" && setCameraData(checkedCamera);
        }, [flag]);

        const fields = {
            create: [
                { label: "Name", key: "name" },
                { label: "Ip", key: "ip" },
                { label: "Login", key: "login" },
                { label: "Password", key: "password" },
                { label: "Storage", key: "storage_id" },
                { label: "Bucket", key: "bucket_id" },
            ],
            edit: [
                { label: "Name", key: "name" },
                { label: "Ip", key: "ip" },
                { label: "Login", key: "login" },
                { label: "Password", key: "password" },
                { label: "Storage", key: "storage_id" },
                { label: "Bucket", key: "bucket_id" },
            ],
        };

        const createCameraHandler = () => {
            dispatch(createCamera(cameraData, user.id));
            setOpen(false);
        };

        const saveCameraHandler = () => {
            dispatch(updateCamera(cameraData, cameraData.key));
            setOpen(false);
        };

        const handleCancel = () => {
            setOpen(false);
        };

        return (
            <Modal
                title={flag === "create" ? "Add New Camera" : "Edit Camera"}
                visible={open}
                onOk={flag === 'create' ? createCameraHandler : saveCameraHandler}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button
                        key="ok"
                        onClick={flag === 'create' ? createCameraHandler : saveCameraHandler}
                        type="primary"
                        // disabled={!regData.password || !regData.email}
                    >
                        {flag === "create" ? "Create" : "Save"}
                    </Button>,
                ]}
            >
                {fields[flag].map((el, index) => (
                    <div className="register-field" key={index}>
                        <p>{el.label}</p>
                        <Input
                            value={cameraData[el.key]}
                            onChange={(e) => {
                                setCameraData({
                                    ...cameraData,
                                    [el.key]: e.currentTarget.value,
                                });
                            }}
                        />
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
