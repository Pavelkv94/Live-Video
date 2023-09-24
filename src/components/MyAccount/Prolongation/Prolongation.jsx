import React, { useState } from "react";
import "./Prolongation.scss";
import { Tabs } from "antd";
import CamerasProlongation from "./CamerasProlongation/CamerasProlongation";
import TrackersProlongation from "./TrackersProlongation/TrackersProlongation";


const Prolongation = ({ t }) => {
    const [tab, setTab] = useState("1");

    const onChangeTab = (key) => {
        setTab(key);
    };
    
    const items = [
        {
            key: "1",
            label: t("myAccount.trackersPayments"),
            children: <TrackersProlongation t={t} />
        },
        {
            key: "2",
            label: t("myAccount.camerasPayments"),
            children: <CamerasProlongation t={t} />
        }
    ];
    return (
        <div className="prolongation">
            <section className="head-section">
                <h2>{t("menuBar.payments")}</h2>
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
            
        </div >
    );
};

export default React.memo(Prolongation);