import { PlusSquareFilled, VideoCameraAddOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCameras } from "../../redux/camerasReducer";
import { CameraModal } from "../general/CameraModal";
import "./CamersList.css";

export const CamerasList = React.memo(() => {
    const dispatch = useDispatch();
   
    const user = useSelector((state) => state.authReducer.user);
    const camerasList = useSelector(
        (state) => state.camerasReducer.camerasList
    );

    useEffect(() => {
        user && dispatch(fetchCameras(user.id));
    }, [user]);

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Ip",
            dataIndex: "ip",
            key: "ip",
        },
        {
            title: "login",
            dataIndex: "login",
            key: "login",
        },
        {
            title: "password",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "",
            dataIndex: "scedule",
            key: "scedule",
            render: () => <Button type="primary">Scedule</Button>,
        },
    ];
    const data = camerasList.map((el) => ({
        key: el.id,
        title: el.name,
        ip: el.ip,
        login: el.login,
        password: el.password,
    }));

    return (
        <div className="cameras-list">
            <section><h2>Cameras</h2> <Button  shape="circle" icon={<VideoCameraAddOutlined />}/></section>
            <Table columns={columns} dataSource={data} />

            <CameraModal />
        </div>
    );
});
