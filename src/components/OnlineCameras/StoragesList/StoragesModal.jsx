import { Input, Select } from "antd";
import React, { useState } from "react";
import { createStorageFieldsAWS, createStorageFieldsIbaS3, editStorageFields, initialStorage } from "../../general/initialData";
import { GeneralModalWrapper } from "../../general/GeneralModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { createStorage } from "../../../redux/storagesReducer";
import "./StoragesList.scss";
import { omit } from "../../../utils/omit";

const { Option } = Select;

const StoragesModal = ({ t, open, setOpen, mode }) => {
    const dispatch = useDispatch();

    const editMode = mode === "edit";

    const user = useSelector((state) => state.authReducer.user);

    const [storageData, setStorageData] = useState(initialStorage);

    const optionsStoragesTypes = ["Iba S3", "Aws S3"].map((el) => <Option key={el}>{el}</Option>);

    const createStorageFields = storageData.type === "Iba S3" ? createStorageFieldsIbaS3 : createStorageFieldsAWS;
    const fields = editMode ? editStorageFields : createStorageFields;

    const handleCreateStorage = () => {
        const removeFields = [
            "login",
            "password",
            "account",
            "role"
        ];
        const data = storageData.type === "Aws S3" ? omit(storageData, ...removeFields) : storageData;
        dispatch(createStorage({ ...data, user_id: user.user_id }));
        setOpen(false);
    };

    const handleCancelCreateStorage = () => {
        setOpen(false);
        setStorageData(initialStorage);
    };

    const buildStorageFields = (el) => {
        if (el.key === "type") {
            return (
                <Select
                    allowClear
                    style={{
                        width: "100%"
                    }}
                    placeholder={t("select")}
                    onChange={(value) => {
                        setStorageData({
                            ...storageData,
                            [el.key]: value
                        });
                    }}
                >
                    {optionsStoragesTypes}
                </Select>
            );
        } else if (el.key === "password") {
            return (
                <Input.Password
                    value={storageData[el.key]}
                    placeholder={t(`${el.placeholder}`)}
                    onChange={(e) => {
                        setStorageData({
                            ...storageData,
                            [el.key]: e.currentTarget.value
                        });
                    }}
                    autoComplete="new-password"
                />
            );
        } else
            return (
                <Input
                    value={storageData[el.key]}
                    placeholder={t(`${el.placeholder}`)}
                    onChange={(e) => {
                        setStorageData({
                            ...storageData,
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
            handleSubmit={handleCreateStorage}
            handleCancel={handleCancelCreateStorage}
            disableButton={!storageData.name}
            title={editMode ? t("edit_storage") : t("create_storage")}
        >
            {fields.map((el, index) => (
                <div key={index} className="storage-field">
                    <p>{t(`${el.label}`)}</p>
                    {buildStorageFields(el)}
                </div>
            ))}
        </GeneralModalWrapper>
    );
};

export default React.memo(StoragesModal);
