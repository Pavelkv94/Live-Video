import { Input, Select } from "antd";
import React from "react";
import { createStorageFields, editStorageFields } from "../../general/initialData";
import { GeneralModalWrapper } from "../../general/GeneralModalWrapper";

const { Option } = Select;

const StoragesModal = ({ t, open, item, handleCancel, handleSubmit, setItem, mode }) => {
    const editMode = mode === "edit";

    const optionsStoragesTypes = ["Iba S3", "Aws S3"].map((el) => <Option key={el}>{el}</Option>);

    const fields = editMode ? editStorageFields : createStorageFields;

    const buildStorageFields = (el) => {
        if (el.key === "storage_type") {
            return (
                <Select
                    allowClear
                    style={{
                        width: "100%"
                    }}
                    placeholder={t("common.select")}
                    onChange={(value) => {
                        setItem({
                            ...item,
                            [el.key]: value
                        });
                    }}
                >
                    {optionsStoragesTypes}
                </Select>
            );
        } else
            return (
                <Input
                    value={item[el.key]}
                    placeholder={t(`onlineCameras.${el.placeholder}`)}
                    onChange={(e) => {
                        setItem({
                            ...item,
                            [el.key]: e.currentTarget.value
                        });
                    }}
                />
            );
    };
    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "edit" : "create"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!item.name}
            title={editMode ? t("onlineCameras.editStorage") : t("onlineCameras.createStorage")}
        >
            {fields.map((el, index) => (
                <div key={index} className="register-field">
                    <p>{t(`onlineCameras.${el.label}`)}</p>
                    {buildStorageFields(el)}
                </div>
            ))}
        </GeneralModalWrapper>
    );
};

export default React.memo(StoragesModal);
