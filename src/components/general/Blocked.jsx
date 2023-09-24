import { Button, Result } from "antd";
import React from "react";

const Blocked = ({ status, title, message}) => {
    return (
        <div style={{ width: "100%", height: "100%" }} className="flex">
            <Result
                status={status}
                title={title}
                subTitle={message}
                extra={<Button type="primary" onClick={() => window.history.back()}>Back</Button>}
            />
        </div>
    );
};

export default React.memo(Blocked);
