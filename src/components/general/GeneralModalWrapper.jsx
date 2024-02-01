import { Button, Modal } from "antd";
import React from "react";
import "./GeneralModalWrapper.scss";

export const GeneralModalWrapper = React.memo(({ open, title, children, handleSubmit, disableButton, action, handleCancel, t, width }) => {

    return (
        <Modal
            title={title}
            className={"modal-wrapper"}
            open={open}
            onOk={handleSubmit}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    {t("close")}
                </Button>,
                <Button key="ok" onClick={handleSubmit} type="primary" disabled={disableButton}>
                    {t(`${action}`)}
                </Button>
            ]}
            width={width}
        >
            <div className="modal-body-wrapper">{children}</div>
        </Modal>
    );
});
