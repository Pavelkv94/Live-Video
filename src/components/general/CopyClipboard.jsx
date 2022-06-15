import { CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";

export const CopyClipboard = ({value}) => {
    const defaultPopup = "Click for copy";
    const [popupMessage, setPopupMessage] = useState(defaultPopup);
    const copy = (value) => navigator.clipboard.writeText(value);

    return (
        <Tooltip placement="top" title={popupMessage}>
            <CopyOutlined
                style={{ marginLeft: "5px" }}
                onClick={() => {
                    setPopupMessage("Copied!");
                    copy(value);
                }}
                onBlur={() => setPopupMessage(defaultPopup)}
            />
        </Tooltip>
    );
};
