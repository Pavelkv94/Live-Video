import { EditOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchCameras } from "../../redux/camerasReducer";
import { CameraModal } from "../general/CameraModal";
import "./CamersList.css";

export const CamerasList = React.memo(() => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState('create');
    const [checkedCamera, setCheckedCamera] = useState({});


    const user = useSelector((state) => state.authReducer.user);
    const camerasList = useSelector( (state) => state.camerasReducer.camerasList );


    useEffect(() => {
        user && dispatch(fetchCameras(user.id));
    }, [user]);


    const showModal = (flag) => {
        setFlag(flag);
        setOpen(true);
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "name",
            key: "name",
            render: (text, params) => <Link to={`details/${params.key}`}>{text}</Link>,
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
            title: "Created",
            dataIndex: "created",
            key: "created",
        },
        {
            title: "",
            dataIndex: "scedule",
            key: "scedule",
            render: (el, params) => <Button icon={<EditOutlined />} onClick={ () => {showModal('edit'); setCheckedCamera(params)}}/>,
        },
    ];
    const data = camerasList.map((el) => ({
        key: el.id,
        name: el.name,
        ip: el.ip,
        login: el.login,
        password: el.password,
        created: el.created_at.slice(0, 10),
    }));



    return (
        <div className="cameras-list">
            <section><h2>Cameras</h2> <Button  shape="circle" icon={<VideoCameraAddOutlined />} onClick={() => showModal('create')}/></section>
            <Table columns={columns} dataSource={data} />

            <CameraModal open={open} setOpen={setOpen} flag={flag} checkedCamera={checkedCamera}/>
        </div>
    );
});
