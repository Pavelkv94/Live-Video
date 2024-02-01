import React, { useState } from "react";
import "./AdminEquipments.scss";
import Blocked from "../../general/Blocked";
import { useSelector } from "react-redux";
import TrackersEquipmentsTab from "./TrackersEquipmentsTab/TrackersEquipmentsTab";
import { Tabs } from "antd";
import HostsManagementTab from "./HostsManagementTab/HostsManagementTab";
import PortsManagementTab from "./PortsManagementTab/PortsManagementTab";

const AdminEquipments = ({ t }) => {
    const user = useSelector((state) => state.authReducer.user);

    const [tab, setTab] = useState("1");

    const onChangeTab = (key) => {
        setTab(key);
    };

    const items = [
        {
            key: "1",
            label: t("trackers_equipments"),
            children: <TrackersEquipmentsTab t={t} setTab={onChangeTab} />
        },
        {
            key: "2",
            label: t("hosts_management"),
            children: <HostsManagementTab t={t} setTab={onChangeTab} />
        },
        {
            key: "3",
            label: t("ports_management"),
            children: <PortsManagementTab t={t} setTab={onChangeTab} />
        }
    ];

    if (!user?.admin) {
        return <Blocked status="403" title={t("access_denied")} message={t("havent_access")} />;
    }

    return (
        <div>
            <section className="head-section">
                <h2>{t("equipments_management")}</h2>
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
        </div>
    );
};

export default React.memo(AdminEquipments);
