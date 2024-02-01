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
                <Switch checked={sharedUser[el[1]]} onChange={onSwitchAccess(el[1])} />
                <label style={{ marginLeft: "10px" }}>{t(el[0])}</label>
            </div>
        ));

    const buildTrackerFields = () =>
        initTrackerSharingFields.map((el, i) => (
            <div key={i} style={{ margin: "10px 0" }}>
                <Switch checked={sharedUser[el[1]]} onChange={onSwitchAccess(el[1])} />
                <label style={{ marginLeft: "10px" }}>{t(el[0])}</label>
            </div>
        ));
    const buildCameraFields = () =>
        initCameraSharingFields.map((el, i) => (
            <div key={i} style={{ margin: "10px 0" }}>
                <Switch checked={sharedUser[el[1]]} onChange={onSwitchAccess(el[1])} />
                <label style={{ marginLeft: "10px" }}>{t(el[0])}</label>
            </div>
        ));
        
    return (
        <GeneralModalWrapper
            t={t}
            title={editMode ? t("change_access_level") : t("add_shared_user")}
            open={openSharedModal}
            action={editMode ? "edit" : "add"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={sharedUser.email === ""}
        >
            <label>{t("email")}:</label>
            {editMode ? (
                <p>{sharedUser.email}</p>
            ) : (
                <Input
                    value={sharedUser.email}
                    onChange={(e) => setSharedUser({ ...sharedUser, email: e.currentTarget.value })}
                    placeholder={t("enter_email")}
                />
            )}
            <section>{mode === "monitoringObject" ? buildObjectFields() : mode === "cameras" ? buildCameraFields() :  buildTrackerFields()}</section>
        </GeneralModalWrapper>
    );
};

export default React.memo(GeneralSharedModal);
