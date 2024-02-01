import React from "react";
import { Button, Modal } from "antd";
import { initCameraSharingFields, initObjectSharingFields, initTrackerSharingFields } from "./initialData";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const GeneraPermissionsModal = ({ t, openPermissions, permissions, handleCancel, mode }) => {
    const fields = mode === "monitoringObject" ? initObjectSharingFields : mode === "trackers" ? initTrackerSharingFields : initCameraSharingFields;

    const buildObjectPermissionsFields = () =>
        fields.map((el, i) => (
            <div key={i} style={{ margin: "10px 0" }}>
                <CheckedCircle
                    checked={
                        mode !== "monitoringObject"
                            ? permissions.permissions[el[1]]
                            : el[1] === "mon_object_edit"
                                ? permissions.permissions.edit
                                : el[1] === "camera_edit"
                                    ? permissions.camera_permissions.edit
                                    : el[1] === "tracker_edit"
                                        ? permissions.tracker_permissions.edit
                                        : false
                    }
                />
                <label style={{ marginLeft: "10px" }}>{t(el[0])}</label>
            </div>
        ));

    return (
        <Modal
            title={`${t("user_permissions")}: ${permissions.email}`}
            className={"modal-wrapper"}
            open={openPermissions}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    {t("close")}
                </Button>
            ]}
        >
            {buildObjectPermissionsFields()}
        </Modal>
    );
};

export default React.memo(GeneraPermissionsModal);

const CheckedCircle = ({ checked }) =>
    checked ? <CheckCircleOutlined style={{ color: "#0b8235", fontSize: 22 }} /> : <CloseCircleOutlined style={{ color: "#f81d22", fontSize: 22 }} />;
