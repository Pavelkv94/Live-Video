import React, { useState } from "react";
import "./MonitoringObjectCamerasTab.scss";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createMonitoringObjectCameras, unassignMonitoringObjectCameras } from "../../../../redux/monitoringObjectsReducer";
import { useParams } from "react-router";
import CameraModal from "../../../OnlineCameras/CamerasList/CameraModal";
import { initialCamera } from "../../../general/initialData";
import { dateConvert } from "../../../../utils/dateConvert";
import { NavLink } from "react-router-dom";
import AssignCameraModal from "./AssignCameraModal";

const MonitoringObjectCamerasTab = ({ t, isSharedObject }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const monitoringObjectCameras = useSelector((state) => state.monitoringObjectsReducer.monitoringObjectCameras);

    const [openCreateCamera, setOpenCreateCamera] = useState(false);
    const [cameraData, setCameraData] = useState(initialCamera);
    const [openAssignCamera, setOpenAssignCamera] = useState(false);

    const handleCreateCamera = () => {
        dispatch(createMonitoringObjectCameras(id, { ...cameraData, monitoring_object_id: id }));
        setOpenCreateCamera(false);
    };

    const handleCancelCreateCamera = () => {
        setOpenCreateCamera(false);
        setCameraData(initialCamera);
    };

    const handleUnassignCamera = (camera) => () => {
        dispatch(unassignMonitoringObjectCameras(id, camera.id));
    };

    const handleCancelAssignCamera = () => {
        setOpenAssignCamera(false);
        setCameraData(initialCamera);
    };

    const columnsCameras = [
        {
            title: t("common.name"),
            dataIndex: "name",
            key: "name",
            render: (text, params) => <NavLink to={`/cameras/details/${params.id}`}>{text}</NavLink>
        },
        {
            title: t("onlineCameras.deviceName"),
            dataIndex: "deviceName",
            key: "deviceName"
        },
        {
            title: t("onlineCameras.ip"),
            dataIndex: "ip",
            key: "ip"
        },
        {
            title: t("login.login"),
            dataIndex: "login",
            key: "login"
        },
        {
            title: t("login.password"),
            dataIndex: "password",
            key: "password"
        },
        {
            title: t("common.created"),
            dataIndex: "created_at",
            key: "created_at",
            render: (text, params) => dateConvert(params.created_at)
        },
        {
            title: "Actions",
            dataIndex: "",
            key: "actions",
            render: (text, params) => (
                <Button style={{ color: "#1890ff" }} type="text" onClick={handleUnassignCamera(params)}>
                    {t("onlineCameras.unassignCamera")}
                </Button>
            )
        }
    ];

    const data = monitoringObjectCameras.map((el) => ({ ...el, key: el.id }));

    return (
        <div className="monitoring-cameras-tab">
            {!isSharedObject && (
                <div>
                    <Button onClick={() => setOpenCreateCamera(true)} type="primary" style={{ marginBottom: "20px" }}>
                        {t("onlineCameras.createCamera")}
                    </Button>
                    <Button onClick={() => setOpenAssignCamera(true)} type="primary" style={{ marginBottom: "20px" }}>
                        {t("onlineCameras.assignCamera")}
                    </Button>
                </div>
            )}

            <Table pagination={false} bordered columns={!isSharedObject ? columnsCameras : columnsCameras.slice(0, -1)} dataSource={data} />

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

            {openAssignCamera && <AssignCameraModal t={t} open={openAssignCamera} handleCancel={handleCancelAssignCamera} objId={id} />}
        </div>
    );
};

export default React.memo(MonitoringObjectCamerasTab);
