import { Modal } from "antd";
import React from "react";

export const DeleteModal = ({ isModalVisible, setIsModalVisible, item, submitModal, t}) => {

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <Modal
            title={`Delete ${item}?`}
            open={isModalVisible}
            onOk={submitModal}
            onCancel={handleCancel}
        >
            <p>{`${t("common.deleteThis")} ${item}? ${t("common.actionCannotUndone")}`}</p>
        </Modal>
    );
};

