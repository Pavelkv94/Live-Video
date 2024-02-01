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
            disableButton={!item.name || !item.code}
            title={editMode ? t("edit_tracker_model") : t("create_tracker_model")}
            width={600}
        >
            <div className="tracker-model-content">
                <Input
                    value={item.name}
                    onChange={handleInput("name")}
                    placeholder={t("enter_tracker_model_name")}
                    style={{ marginBottom: 20 }}
                />
                <Input value={item.code} onChange={handleInput("code")} placeholder={t("enter_tracker_model_code")} />
            </div>
        </GeneralModalWrapper>
    );
};

export default React.memo(TrackerModelModal);
