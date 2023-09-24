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
                    {t("common.close")}
                </Button>,
                <Button key="ok" onClick={handleSubmit} type="primary" disabled={disableButton}>
                    {t(`common.${action}`)}
                </Button>
            ]}
            width={width}
        >
            <div>{children}</div>
        </Modal>
    );
});
