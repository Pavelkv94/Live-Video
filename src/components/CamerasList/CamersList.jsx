import { VideoCameraAddOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteCameraAction, fetchCameras } from "../../redux/camerasReducer";
import { dateConvert } from "../../utils/dateConvert";
import { CustomModal } from "../general/CustomModal";
import "./CamersList.css";

const CamerasList = React.memo(() => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState("default");
    // const [checkedCamera, setCheckedCamera] = useState({});

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
            dataIndex: "created_at",
            key: "created_at",
        }
    ];
    const data = camerasList.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at),
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
            <Table columns={columns} dataSource={data} pagination={data.length > 9} />

            {open && <CustomModal
                open={open}
                setOpen={setOpen}
                flag={flag}
                setFlag={setFlag}
            />}
        </div>
    );
});

export default CamerasList;
