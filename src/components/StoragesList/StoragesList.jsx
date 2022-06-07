import { DeleteOutlined, EditOutlined, FileAddOutlined, FolderAddOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchCameras } from "../../redux/camerasReducer";
import { deleteStorage, fetchStorages } from "../../redux/storagesReducer";
import { CustomModal } from "../general/CustomModal";
import "./StoragesList.css";

export const StoragesList = React.memo(() => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState('create_storage');
    const [checkedStorage, setCheckedStorage] = useState({});


    const user = useSelector((state) => state.authReducer.user);
    const storagesList = useSelector( (state) => state.storagesReducer.storagesList );


    useEffect(() => {
        user && dispatch(fetchStorages(user.id));
    }, [user]);


    const showModal = (flag) => {
        setFlag(flag);
        setOpen(true);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, params) => <Link to={`details/${params.key}`}>{text}</Link>,
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
            render: (el, params) => <><Button icon={<EditOutlined />} onClick={ () => {showModal('edit_storage'); setCheckedStorage(params)}}/><Button icon={<DeleteOutlined />} onClick={() => dispatch(deleteStorage(params.key, user.id))}/></>,
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
        <div className="cameras-list">
            <section><h2>Storages</h2> <Button  shape="circle" icon={<FolderAddOutlined />} onClick={() => showModal('create_storage')}/></section>
            <Table columns={columns} dataSource={data} />

            <CustomModal open={open} setOpen={setOpen} flag={flag} checkedElement={checkedStorage}/>
        </div>
    );
});
