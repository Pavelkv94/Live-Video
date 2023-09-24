import React from "react";
import "./Notifications.scss";


const NotificationIndicator = ({ items }) => {
    return (
        <div className="note-indicator-wrap">
            <div className="note-indicator"></div>
            {items}
        </div>
    );
};

export default React.memo(NotificationIndicator);
