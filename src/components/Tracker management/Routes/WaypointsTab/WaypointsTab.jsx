import React from "react";
import "./WaypointsTab.scss";
import { Empty } from "antd";

const WaypointsTab = ({ t, selectedReport }) => {
    return selectedReport ? (
        <div>
            <h3>TAB! {t("")}</h3>
        </div>
    ) : (
        <Empty />
    );
};

export default React.memo(WaypointsTab);
