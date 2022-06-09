import {
    DeleteOutlined,
    EditOutlined,
    FolderAddOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCameraAction } from "../../redux/camerasReducer";
import { deleteStorage, fetchStorages } from "../../redux/storagesReducer";
import { CustomModal } from "../general/CustomModal";
import { DeleteModal } from "../general/DeleteModal";
import "./StoragesList.css";

const StoragesList = React.memo(() => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState("create_storage");
    const [checkedStorage, setCheckedStorage] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const user = useSelector((state) => state.authReducer.user);
    const storagesList = useSelector(
        (state) => state.storagesReducer.storagesList
    );

    useEffect(() => {
        user && dispatch(fetchStorages(user.id));
    }, [user]);

    useEffect(() => {
        dispatch(deleteCameraAction(""));
    }, []);

    const showModal = (flag) => {
        setFlag(flag);
        setOpen(true);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, params) => <a>{text}</a>,
        },
        {
            title: "Storage Type",
            dataIndex: "storage_type",
            key: "storage_type",
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url",
        },
        {
            title: "Created",
            dataIndex: "created",
            key: "created",
        },
        {
            title: "Access key",
            dataIndex: "aws_access_key_id",
            key: "aws_access_key_id",
        },
        {
            title: "Access secret key",
            dataIndex: "aws_secret_access_key",
            key: "aws_secret_access_key",
        },
        {
            title: "",
            dataIndex: "edit",
            key: "edit",
            render: (el, params) => (
                <div className="storage-actions">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            showModal("edit_storage");
                            setCheckedStorage(params);
                        }}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {setIsModalVisible(true); setCheckedStorage(params)}}
                    />
                </div>
            ),
        },
    ];
    const data = storagesList.map((el) => ({
        key: el.id,
        name: el.name,
        storage_type: el.storage_type,
        url: el.url,
        aws_access_key_id: el.aws_access_key_id,
        aws_secret_access_key: el.aws_secret_access_key,
        created: el.created_at.slice(0, 10),
    }));

    return (
        <div className="common-list">
            <section>
                <h2>Storages</h2>{" "}
                <Button
                    shape="circle"
                    icon={<FolderAddOutlined />}
                    onClick={() => showModal("create_storage")}
                />
            </section>
            <Table columns={columns} dataSource={data} />

            <CustomModal
                open={open}
                setOpen={setOpen}
                flag={flag}
                checkedElement={checkedStorage}
            />

            <DeleteModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item="storage"
                callback={deleteStorage}
                id={checkedStorage.key}
            />
        </div>
    );
});

export default StoragesList;
