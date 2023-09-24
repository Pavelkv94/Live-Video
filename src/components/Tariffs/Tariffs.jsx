import React, { useState } from "react";
import "./Tariffs.scss";
import { Tabs } from "antd";
import TrackersTariffsTab from "./TrackersTariffsTab/TrackersTariffsTab";
import CamerasTariffsTab from "./CamerasTariffsTab/CamerasTariffsTab";

const Tariffs = ({ t }) => {
    const [tab, setTab] = useState("1");

    const onChangeTab = (key) => {
        setTab(key);
    };

    const items = [
        {
            key: "1",
            label: t("tariffs.trackersTariffs"),
            children: <TrackersTariffsTab t={t} />
        },
        {
            key: "2",
            label: t("tariffs.camerasTariffs"),
            children: <CamerasTariffsTab t={t} />
        }
    ];
    return (
        <div className="tariffs">
            <section className="head-section">
                <h2>{t("menuBar.tariffs")}</h2>
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
        </div>
    );
};

export default React.memo(Tariffs);
