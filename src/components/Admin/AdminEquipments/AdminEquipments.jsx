import React, { useState } from "react";
import "./AdminEquipments.scss";
import Blocked from "../../general/Blocked";
import { useSelector } from "react-redux";
import CamerasEquipmentsTab from "./CamerasEquipmentsTab/CamerasEquipmentsTab";
import TrackersEquipmentsTab from "./TrackersEquipmentsTab/TrackersEquipmentsTab";
import { Tabs } from "antd";

const AdminEquipments = ({ t }) => {
    const user = useSelector((state) => state.authReducer.user);

    const [tab, setTab] = useState("1");

    const onChangeTab = (key) => {
        setTab(key);
    };

    const items = [
        {
            key: "1",
            label: t("admin.trackersEquipments"),
            children: <TrackersEquipmentsTab t={t} setTab={onChangeTab} />
        },
        {
            key: "2",
            label: t("admin.camerasEquipments"),
            children: <CamerasEquipmentsTab t={t} />
        }
    ];

    if (!user?.admin_name) {
        return <Blocked status="403" title={t("common.accessDenied")} message={t("common.haventAccess")} />;
    }

    return (
        <div>
            <section className="head-section">
                <h2>{t("admin.equipmentsManagement")}</h2>
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
        </div>
    );
};

export default React.memo(AdminEquipments);
