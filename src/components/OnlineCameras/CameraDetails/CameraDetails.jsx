import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCamera } from "../../../redux/camerasReducer";
import { CameraSchedules } from "./CameraSchedules/CameraSchedules";
import "./CameraDetails.scss";
import { History } from "./History/History";
import { LiveTab } from "./LiveTab/LiveTab";
import { PageHeader } from "@ant-design/pro-layout";
import { ShareAltOutlined } from "@ant-design/icons";

const CameraDetails = ({ t }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentCamera = useSelector((state) => state.camerasReducer.currentCamera);
    const deleteCameraStatus = useSelector((state) => state.camerasReducer.deleteCameraStatus);

    const [tab, setTab] = useState("1");

    useEffect(() => {
        dispatch(fetchCamera(id));
    }, []);

    useEffect(() => {
        if (deleteCameraStatus === "fulfilled") {
            window.history.back();
        }
    }, [deleteCameraStatus]);

    const onChangeTab = (key) => {
        setTab(key);
    };

    const items = [
        {
            key: "1",
            label: t("onlineCameras.live"),
            children: <LiveTab currentCamera={currentCamera} setTab={onChangeTab} t={t} />
        },
        {
            key: "2",
            label: t("onlineCameras.cameraSchedules"),
            children: <CameraSchedules t={t} />
        },
        {
            key: "3",
            label: t("onlineCameras.history"),
            children: <History t={t} />
        }
    ];

    return (
        <div>
            <section className="head-section">
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={currentCamera.name}
                    // title={"Home"}
                />
                {currentCamera.shared_to && currentCamera.shared_to.length > 0 && (
                    <div className="shared-object">
                        <ShareAltOutlined />
                    </div>
                )}
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
        </div>
    );
};

export default React.memo(CameraDetails);
