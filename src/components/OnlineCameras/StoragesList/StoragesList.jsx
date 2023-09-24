import { FolderAddOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCameraAction } from "../../../redux/camerasReducer";
import { createStorage, fetchStorages } from "../../../redux/storagesReducer";
import { dateConvert } from "../../../utils/dateConvert";
import "./StoragesList.scss";
import { NavLink } from "react-router-dom";
import StoragesModal from "./StoragesModal";
import { initialStorage } from "../../general/initialData";

const StoragesList = React.memo(({ t }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [storageData, setStorageData] = useState(initialStorage);

    const user = useSelector((state) => state.authReducer.user);
    const storagesList = useSelector((state) => state.storagesReducer.storagesList);

    useEffect(() => {
        user && dispatch(fetchStorages(user.id));
    }, [user]);

    useEffect(() => {
        dispatch(deleteCameraAction(""));
    }, []);

    const handleCreateStorage = () => {
        dispatch(createStorage({...storageData, user_id: user.user_id}));
        setOpen(false);
    };

    const handleCancelCreateStorage = () => {
        setOpen(false);
        setStorageData(initialStorage);
    };

    const columns = [
        {
            title: t("common.name"),
            dataIndex: "name",
            key: "name",
            render: (text, params) => <NavLink to={`details/${params.key}`}>{text}</NavLink>
        },
        {
            title: t("onlineCameras.storageType"),
            dataIndex: "storage_type",
            key: "storage_type"
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url"
        },
        {
            title: t("common.created"),
            dataIndex: "created_at",
            key: "created_at"
        }
    ];

    const data = storagesList.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at)
    }));

    return (
        <div className="storages">
            <section className="head-section">
                <h2>{t("menuBar.storages")}</h2>
                <Button shape="circle" icon={<FolderAddOutlined />} onClick={() => setOpen(true)} />
            </section>
            <Table columns={columns} dataSource={data} pagination={data.length > 9} />
            {open && (
                <StoragesModal
                    t={t}
                    open={open}
                    handleCancel={handleCancelCreateStorage}
                    item={storageData}
                    setItem={setStorageData}
                    mode={"create"}
                    handleSubmit={handleCreateStorage}
                />
            )}
        </div>
    );
});

export default StoragesList;
