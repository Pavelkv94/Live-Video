import React, { useEffect, useState } from "react";
import { GeneralModalWrapper } from "../../general/GeneralModalWrapper";
import { Input, Select } from "antd";
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

    const trackerModelsOptions = trackerModels.map((el) => ({ value: el.id, label: el.name }));

    const disableModalButton =
        item.name.trim() === "" ||
        !item.tracker_model_id.toString().trim() === "" ||
        item.average_consumption.toString().trim() === "" ||
        item.imei.toString().trim().trim() === "" ||
        item.stopping_time.toString().trim().trim() === "" ||
        item.parking_time.toString().trim().trim() === "";

    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "edit" : "create"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={disableModalButton}
            title={editMode ? t("edit_tracker") : t("create_tracker")}
            width={600}
        >
            <div className="tracker-modal-content">
                {initalTrackerFields.map((el, i) => (
                    <div key={i} className="register-field">
                        <label>{t(el.label)}:</label>
                        {el.name === "tracker_model_id" ? (
                            <Select
                                allowClear
                                style={{
                                    width: "100%"
                                }}
                                placeholder={t("select_tracker")}
                                defaultValue={editMode ? item.tracker_model_id : null}
                                onChange={(value) => {
                                    setItem({ ...item, tracker_model_id: value });
                                }}
                                options={trackerModelsOptions}
                            />
                        ) : (
                            <Input value={item[el.name]} onChange={handleInput(el.name)} placeholder={t(el.placeholder)} />
                        )}
                    </div>
                ))}
                <div className="register-field">
                    <label>{t("tracker_color")}:</label>
                    <GeneralPalette value={colorHex} setValue={setColorHex} />
                </div>
            </div>
        </GeneralModalWrapper>
    );
};

export default React.memo(TrackerEditModal);
