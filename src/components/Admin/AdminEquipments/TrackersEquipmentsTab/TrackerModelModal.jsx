import React from "react";
import { GeneralModalWrapper } from "../../../general/GeneralModalWrapper";
import { Input } from "antd";

const TrackerModelModal = ({ t, open, item, handleCancel, handleSubmit, setItem, mode }) => {
    const editMode = mode === "edit";

    const handleInput = (field) => (e) => {
        setItem({ ...item, [field]: e.currentTarget.value });
    };

    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "edit" : "create"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!item.trmodel_name || !item.trmodel_code}
            title={editMode ? t("admin.editTrackerModel") : t("admin.createTrackerModel")}
            width={600}
        >
            <div className="tracker-model-content">
                <Input
                    value={item.trmodel_name}
                    onChange={handleInput("trmodel_name")}
                    placeholder={t("admin.enterTrackerModelName")}
                    style={{ marginBottom: 20 }}
                />
                <Input value={item.trmodel_code} onChange={handleInput("trmodel_code")} placeholder={t("admin.enterTrackerModelCode")} />
            </div>
        </GeneralModalWrapper>
    );
};

export default React.memo(TrackerModelModal);
