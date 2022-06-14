import {
    DeleteOutlined,
    EditOutlined,
    VideoCameraAddOutlined,
} from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    deleteCamera,
    deleteCameraAction,
    fetchCameras,
} from "../../redux/camerasReducer";
import { dateConvert } from "../../utils/dateConvert";
import { CustomModal } from "../general/CustomModal";
import "./CamersList.css";

const CamerasList = React.memo(() => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState("create_camera");
    const [checkedCamera, setCheckedCamera] = useState({});

    const user = useSelector((state) => state.authReducer.user);
    const camerasList = useSelector(
        (state) => state.camerasReducer.camerasList
    );

    useEffect(() => {
        user && dispatch(fetchCameras(user.id));
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
            render: (text, params) => (
                <NavLink to={`details/${params.key}`}>{text}</NavLink>
            ),
        },
        {
            title: "Device Name",
            dataIndex: "deviceName",
            key: "deviceName",
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
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (el, params) => <Tag color={params.status === 'recording' ? "green" : "red" }>{params.status ? params.status : 'disabled'}</Tag>
        }
        // {
        //     title: "",
        //     dataIndex: "scedule",
        //     key: "scedule",
        //     render: (el, params) => (
        //         <>
        //             <Button
        //                 icon={<EditOutlined />}
        //                 onClick={() => {
        //                     showModal("edit_camera");
        //                     setCheckedCamera(params);
        //                 }}
        //             />
        //             <Button
        //                 icon={<DeleteOutlined />}
        //                 onClick={() =>
        //                     dispatch(deleteCamera(params.key, user.id))
        //                 }
        //             />
        //         </>
        //     ),
        // },
    ];
    const data = camerasList.map((el) => ({
        key: el.id,
        name: el.name,
        deviceName: el.deviceName,
        status: el.status,
        ip: el.ip,
        login: el.login,
        password: el.password,
        created: dateConvert(el.created_at),
    }));

    return (
        <div className="common-list">
            <section>
                <h2>Cameras</h2>{" "}
                <Button
                    shape="circle"
                    icon={<VideoCameraAddOutlined />}
                    onClick={() => showModal("create_camera")}
                />
            </section>
            <Table columns={columns} dataSource={data} />

            <CustomModal
                open={open}
                setOpen={setOpen}
                flag={flag}
                checkedElement={checkedCamera}
            />
        </div>
    );
});

export default CamerasList;
