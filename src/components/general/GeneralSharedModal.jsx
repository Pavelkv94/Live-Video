import React from "react";
import { Input, Switch } from "antd";
import { GeneralModalWrapper } from "./GeneralModalWrapper";
import { initCameraSharingFields, initObjectSharingFields, initTrackerSharingFields } from "./initialData";

const GeneralSharedModal = ({ t, openSharedModal, sharedUser, handleCancel, handleSubmit, setSharedUser, editMode, mode }) => {

    const onSwitchAccess = (key) => (change) => {
        setSharedUser({ ...sharedUser, [key]: change });
    };

    const buildObjectFields = () =>
        initObjectSharingFields.map((el, i) => (
            <div key={i} style={{ margin: "10px 0" }}>
                <Switch checked={sharedUser[el]} onChange={onSwitchAccess(el)} />
                <label style={{ marginLeft: "10px" }}>{t(`common.${el}`)}</label>
            </div>
        ));

    const buildTrackerFields = () =>
        initTrackerSharingFields.map((el, i) => (
            <div key={i} style={{ margin: "10px 0" }}>
                <Switch checked={sharedUser[el]} onChange={onSwitchAccess(el)} />
                <label style={{ marginLeft: "10px" }}>{t(`common.${el === "change_access" ? "change_access_tr" : el}`)}</label>
            </div>
        ));
    const buildCameraFields = () =>
        initCameraSharingFields.map((el, i) => (
            <div key={i} style={{ margin: "10px 0" }}>
                <Switch checked={sharedUser[el]} onChange={onSwitchAccess(el)} />
                <label style={{ marginLeft: "10px" }}>{t(`common.${el === "change_access" ? "change_access_cam" : el}`)}</label>
            </div>
        ));
        
    return (
        <GeneralModalWrapper
            t={t}
            title={editMode ? t("monitoringObjects.changeAccesslevel") : t("monitoringObjects.addSharedUser")}
            open={openSharedModal}
            action={editMode ? "edit" : "add"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={sharedUser.email === ""}
        >
            <label>{t("common.email")}:</label>
            {editMode ? (
                <p>{sharedUser.email}</p>
            ) : (
                <Input
                    value={sharedUser.email}
                    onChange={(e) => setSharedUser({ ...sharedUser, email: e.currentTarget.value })}
                    placeholder={t("common.enterEmail")}
                />
            )}
            <section>{mode === "monitoringObject" ? buildObjectFields() : mode === "cameras" ? buildCameraFields() :  buildTrackerFields()}</section>
        </GeneralModalWrapper>
    );
};

export default React.memo(GeneralSharedModal);
