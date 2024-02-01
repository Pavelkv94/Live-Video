import { ShareAltOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createCamera, deleteCameraAction, fetchCameras } from "../../../redux/camerasReducer";
import { dateConvert, isDateExpired } from "../../../utils/dateConvert";
import "./CamersList.scss";
import CameraModal from "./CameraModal";
import { initialCamera } from "../../general/initialData";

const CamerasList = ({ t, isMobileSize }) => {
    const dispatch = useDispatch();

    const [openCreateCamera, setOpenCreateCamera] = useState(false);
    const [cameraData, setCameraData] = useState(initialCamera);

    const user = useSelector((state) => state.authReducer.user);
    const camerasList = useSelector((state) => state.camerasReducer.camerasList);

    useEffect(() => {
        user && dispatch(fetchCameras(user.id));
    }, [user]);

    useEffect(() => {
        dispatch(deleteCameraAction(""));
    }, []);

    const handleCreateCamera = () => {
        dispatch(createCamera(cameraData, user.id));
        setOpenCreateCamera(false);
    };

    const handleCancelCreateCamera = () => {
        setOpenCreateCamera(false);
        setCameraData(initialCamera);
    };

    const columns = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            render: (text, params) => (
                <div>
                    <NavLink to={`details/${params.key}`}>{text}</NavLink>
                    {isDateExpired(params.paid_till) && <i style={{ color: "red" }}>{` (${t("expired")})`}</i>}
                    {params.user_id !== user.id && <ShareAltOutlined style={{ marginLeft: 5 }} />}
                </div>
            )
        },
        {
            title: t("model"),
            dataIndex: "model",
            key: "model"
        },
        {
            title: t("ip"),
            dataIndex: "ip_address",
            key: "ip_address"
        },
        {
            title: t("login"),
            dataIndex: "login",
            key: "login"
        },
        {
            title: t("password"),
            dataIndex: "password",
            key: "password"
        },
        {
            title: t("created"),
            dataIndex: "created_at",
            key: "created_at"
        }
    ];

    const data = camerasList.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at)
    }));

    return (
        <div className="common-list">
            <section>
                <h2>{t("cameras")}</h2>
                <Button shape="circle" icon={<VideoCameraAddOutlined />} onClick={() => setOpenCreateCamera(true)} />
            </section>
            <Table columns={columns} dataSource={data} pagination={data.length > 9} size={isMobileSize ? "small" : "middle"}/>

            {openCreateCamera && (
                <CameraModal
                    t={t}
                    open={openCreateCamera}
                    handleCancel={handleCancelCreateCamera}
                    item={cameraData}
                    setItem={setCameraData}
                    mode={"create"}
                    handleSubmit={handleCreateCamera}
                />
            )}
        </div>
    );
};

export default React.memo(CamerasList);
