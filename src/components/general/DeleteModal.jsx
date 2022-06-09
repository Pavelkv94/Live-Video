import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const DeleteModal = ({ isModalVisible, setIsModalVisible, item, callback, id }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);

    const handleOk = () => {
        dispatch(callback(id, user.id))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <Modal
            title={`Delete ${item}?`}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>{`Are you sure you want to delete this ${item}? This action cannot be undone.`}</p>
        </Modal>
    );
};
