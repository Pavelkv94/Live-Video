import React, { useEffect, useState } from "react";
import { GeneralModalWrapper } from "../../general/GeneralModalWrapper";
import { Checkbox, Input, Select } from "antd";
import { initalTrackerFields } from "../../general/initialData";
import GeneralPalette from "../../general/GeneralPalette";
import { useSelector } from "react-redux";

const TrackerEditModal = ({ t, open, item, handleCancel, handleSubmit, setItem, mode }) => {
    const editMode = mode === "edit";

    const trackerModels = useSelector((state) => state.trackersReducer.trackerModels);

    const [colorHex, setColorHex] = useState(item.color || "#FF0000");

    useEffect(() => {
        setItem({ ...item, color: colorHex });
    }, [colorHex]);

    const handleInput = (field) => (e) => {
        setItem({ ...item, [field]: e.currentTarget.value });
    };

    const handleCheckbox = (field) => (e) => {
        setItem({ ...item, [field]: e.target.checked });
    };

    const trackerModelsOptions = trackerModels.map((el) => ({ value: el.trmodel_id, label: el.trmodel_name }));

    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "edit" : "create"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!item.trobject_name || !item.trobject_ref_trmodel}
            title={editMode ? t("trackerManagement.editTracker") : t("trackerManagement.createTracker")}
            width={600}
        >
            <div className="tracker-modal-content">
                {initalTrackerFields.map((el, i) => (
                    <div key={i} className="register-field">
                        <label>{t(el.label)}:</label>
                        {el.name === "trobject_public" ? (
                            <Checkbox checked={item[el.name]} onChange={handleCheckbox(el.name)}>
                                {t("trackerManagement.makePublic")}
                            </Checkbox>
                        ) : el.name === "trobject_ref_trmodel" ? (
                            <Select
                                allowClear
                                style={{
                                    width: "100%"
                                }}
                                placeholder={t("common.selectTracker")}
                                defaultValue={null}
                                onChange={(value) => {
                                    setItem({ ...item, trobject_ref_trmodel: value });
                                }}
                                options={trackerModelsOptions}
                            />
                        ) : (
                            <Input value={item[el.name]} onChange={handleInput(el.name)} placeholder={t(el.placeholder)} />
                        )}
                    </div>
                ))}
                <div className="register-field">
                    <label>{t("trackerManagement.trackerColor")}:</label>
                    <GeneralPalette value={colorHex} setValue={setColorHex} />
                </div>
            </div>
        </GeneralModalWrapper>
    );
};

export default React.memo(TrackerEditModal);
