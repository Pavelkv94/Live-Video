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
            <p>{`${t("delete_this")} ${item}? ${t("action_cannot_undone")}`}</p>
        </Modal>
    );
};

