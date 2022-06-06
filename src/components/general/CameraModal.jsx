import { Button, Input, Modal } from "antd";
import React, { useState } from "react";



export const CameraModal = React.memo(({}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <Modal
        title="Add New Camera"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <Button key="cancel" onClick={handleCancel}>
                Close
            </Button>,
            <Button
                key="ok"
                onClick={handleOk}
                type="primary"
                // disabled={!regData.password || !regData.email}
            >
                Sign Up
            </Button>,
        ]}
    >
        <div className="register-field">
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
        </div>
    </Modal>
    );
});
