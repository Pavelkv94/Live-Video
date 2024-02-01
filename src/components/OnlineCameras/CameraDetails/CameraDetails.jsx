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

const CameraDetails = ({ t, isMobileSize }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentCamera = useSelector((state) => state.camerasReducer.currentCamera);
    const deleteCameraStatus = useSelector((state) => state.camerasReducer.deleteCameraStatus);
    const user = useSelector((state) => state.authReducer.user);

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
            label: t("live"),
            children: <LiveTab currentCamera={currentCamera} setTab={onChangeTab} t={t} isMobileSize={isMobileSize}/>
        },
        {
            key: "2",
            label: t("camera_schedules"),
            children: <CameraSchedules t={t} isMobileSize={isMobileSize}/>
        },
        {
            key: "3",
            label: t("history"),
            children: <History t={t} isMobileSize={isMobileSize}/>
        }
    ];

    return (
        <div>
            <section className="head-section">
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={currentCamera.name}
                />
                {currentCamera.user_id !== user.id && (
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
