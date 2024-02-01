import React, { useState } from "react";
import "./Tariffs.scss";
import { Tabs } from "antd";
import TrackersTariffsTab from "./TrackersTariffsTab/TrackersTariffsTab";
import CamerasTariffsTab from "./CamerasTariffsTab/CamerasTariffsTab";

const Tariffs = ({ t, isMobileSize }) => {
    const [tab, setTab] = useState("1");

    const onChangeTab = (key) => {
        setTab(key);
    };

    const items = [
        {
            key: "1",
            label: t("trackers_tariffs"),
            children: <TrackersTariffsTab t={t} isMobileSize={isMobileSize}/>
        },
        {
            key: "2",
            label: t("cameras_tariffs"),
            children: <CamerasTariffsTab t={t} isMobileSize={isMobileSize}/>
        }
    ];
    return (
        <div className="tariffs">
            <section className="head-section">
                <h2>{t("tariffs")}</h2>
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
        </div>
    );
};

export default React.memo(Tariffs);
