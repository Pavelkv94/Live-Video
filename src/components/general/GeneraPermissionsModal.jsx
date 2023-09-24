import React from "react";
import { Button, Modal } from "antd";
import { initCameraSharingFields, initObjectSharingFields, initTrackerSharingFields } from "./initialData";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const GeneraPermissionsModal = ({ t, openPermissions, permissions, handleCancel, mode }) => {

    const fields = mode === "monitoringObject" ? initObjectSharingFields : mode === "trackers" ? initTrackerSharingFields :  initCameraSharingFields;

    const buildObjectPermissionsFields = () =>
        fields.map((el, i) => (
            <div key={i} style={{ margin: "10px 0" }}>
                {permissions[el] ? (
                    <CheckCircleOutlined style={{ color: "#0b8235", fontSize: 22 }} />
                ) : (
                    <CloseCircleOutlined style={{ color: "#f81d22", fontSize: 22 }} />
                )}
                <label style={{ marginLeft: "10px" }}>{t(`common.${el === "change_access" ? "change_access_cam" : el}`)}</label>
            </div>
        ));

    return (
        <Modal
            title={`${t("common.userPermissions")}: ${permissions.email}`}
            className={"modal-wrapper"}
            open={openPermissions}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    {t("common.close")}
                </Button>
            ]}
        >
            {buildObjectPermissionsFields()}
        </Modal>
    );
};

export default React.memo(GeneraPermissionsModal);
