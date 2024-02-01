import React, { useEffect, useState } from "react";
import "./MonitoringObjectsDetails.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonitoringObject } from "../../../redux/monitoringObjectsReducer";
import { Spin, Tabs } from "antd";
import MonitoringObjectDetailsTab from "./MonitoringObjectDetailsTab/MonitoringObjectDetailsTab";
import MonitoringObjectCamerasTab from "./MonitoringObjectCamerasTab/MonitoringObjectCamerasTab";
import MonitoringObjectTrackersTab from "./MonitoringObjectTrackersTab/MonitoringObjectTrackersTab";
import { ShareAltOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import Routes from "../../Tracker management/Routes/Routes";

const MonitoringObjectsDetails = ({ t, isMobileSize }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const monitoringObject = useSelector((state) => state.monitoringObjectsReducer.monitoringObject);

    const user = useSelector((state) => state.authReducer.user);

    const isSharedObject = user.id !== monitoringObject?.user_id;

    useEffect(() => {
        dispatch(fetchMonitoringObject(id));
    }, [dispatch]);

    // useEffect(() => {
    //     return () => {
    //         dispatch(resetMonitoringObjectAction());
    //     };
    // }, []);

    const [tab, setTab] = useState("1");

    const onChangeTab = (key) => {
        setTab(key);
    };

    const items = [
        {
            key: "1",
            label: t("monitoring_object_details"),
            children: (
                <MonitoringObjectDetailsTab
                    setTab={onChangeTab}
                    t={t}
                    monitoringObject={monitoringObject}
                    isSharedObject={isSharedObject}
                    isMobileSize={isMobileSize}
                />
            )
        },
        {
            key: "2",
            label: t("monitoring_object_cameras"),
            children: <MonitoringObjectCamerasTab t={t} isSharedObject={isSharedObject} isMobileSize={isMobileSize}/>
        },
        {
            key: "3",
            label: t("monitoring_object_trackers"),
            children: <MonitoringObjectTrackersTab t={t} isSharedObject={isSharedObject} isMobileSize={isMobileSize}/>
        },
        {
            key: "4",
            label: t("monitoring_object_routes"),
            children: <Routes t={t} isMobileSize={isMobileSize} />
        }
    ];

    if (!monitoringObject) return <Spin />;

    return (
        <div className="monitoring-details">
            <section className="head-section">
                <PageHeader className="site-page-header" onBack={() => window.history.back()} title={monitoringObject.name} />
                {isSharedObject && (
                    <div className="shared-object">
                        <ShareAltOutlined />
                    </div>
                )}
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
        </div>
    );
};

export default React.memo(MonitoringObjectsDetails);
