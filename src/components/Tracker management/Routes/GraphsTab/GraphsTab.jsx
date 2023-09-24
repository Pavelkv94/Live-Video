import React from "react";
import "./GraphsTab.scss";
import { Empty } from "antd";

const GraphsTab = ({ t, selectedReport }) => {
    return selectedReport ? (
        <div>
            <h3>TAB!{t("")}</h3>
        </div>
    ) : (
        <Empty />
    );
};

export default React.memo(GraphsTab);
