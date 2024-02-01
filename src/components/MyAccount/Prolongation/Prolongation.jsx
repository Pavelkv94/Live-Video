import React, { useState } from "react";
import "./Prolongation.scss";
import { Tabs } from "antd";
import CamerasProlongation from "./CamerasProlongation/CamerasProlongation";
import TrackersProlongation from "./TrackersProlongation/TrackersProlongation";


const Prolongation = ({ t, isMobileSize }) => {
    const [tab, setTab] = useState("1");

    const onChangeTab = (key) => {
        setTab(key);
    };
    
    const items = [
        {
            key: "1",
            label: t("trackers_payments"),
            children: <TrackersProlongation t={t} isMobileSize={isMobileSize}/>
        },
        {
            key: "2",
            label: t("cameras_payments"),
            children: <CamerasProlongation t={t} isMobileSize={isMobileSize}/>
        }
    ];
    return (
        <div className="prolongation">
            <section className="head-section">
                <h2>{t("payments")}</h2>
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
            
        </div >
    );
};

export default React.memo(Prolongation);