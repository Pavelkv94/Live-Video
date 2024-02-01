import { FolderAddOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCameraAction } from "../../../redux/camerasReducer";
import { fetchStorages } from "../../../redux/storagesReducer";
import { dateConvert } from "../../../utils/dateConvert";
import "./StoragesList.scss";
import { NavLink } from "react-router-dom";
import StoragesModal from "./StoragesModal";

const StoragesList = React.memo(({ t, isMobileSize }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const user = useSelector((state) => state.authReducer.user);
    const storagesList = useSelector((state) => state.storagesReducer.storagesList);

    useEffect(() => {
        user && dispatch(fetchStorages(user.id));
    }, [user]);

    useEffect(() => {
        dispatch(deleteCameraAction(""));
    }, []);

    const columns = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            render: (text, params) => <NavLink to={`details/${params.key}`}>{text}</NavLink>
        },
        {
            title: t("storage_type"),
            dataIndex: "storage_type",
            key: "storage_type"
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url"
        },
        {
            title: t("created"),
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
                <h2>{t("storages")}</h2>
                <Button shape="circle" icon={<FolderAddOutlined />} onClick={() => setOpen(true)} />
            </section>
            <Table columns={columns} dataSource={data} pagination={data.length > 9} size={isMobileSize ? "small" : "middle"}/>
            {open && (
                <StoragesModal
                    t={t}
                    open={open}
                    setOpen={setOpen}
                    mode={"create"}
                />
            )}
        </div>
    );
});

export default StoragesList;
