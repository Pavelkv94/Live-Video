import React, { useEffect } from "react";
import { GeneralModalWrapper } from "../../general/GeneralModalWrapper";
import { Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cameraFields } from "../../general/initialData";
import { fetchBuckets, fetchStorages } from "../../../redux/storagesReducer";
import "./CamersList.scss";

const CameraModal = ({ t, open, item, handleCancel, handleSubmit, setItem, mode }) => {
    const dispatch = useDispatch();
    const editMode = mode === "edit";

    const bucketsList = useSelector((state) => state.storagesReducer.bucketsList);
    const storagesList = useSelector((state) => state.storagesReducer.storagesList);
    const user = useSelector((state) => state.authReducer.user);
    const storage = useSelector((state) => state.storagesReducer.currentStorage);
    const bucket = useSelector((state) => state.storagesReducer.currentBucket);

    const optionsStorages = storagesList.map((el) => <Select.Option key={el.id}>{el.name}</Select.Option>);
    const optionsBucket = bucketsList.map((el) => <Select.Option key={el.id}>{el.name}</Select.Option>);

    useEffect(() => {
        dispatch(fetchStorages(user.user_id));
    }, []);

    useEffect(() => {
        item.storage_id && dispatch(fetchBuckets(item.storage_id));
    }, [item]);

    const handleInput = (field) => (e) => {
        setItem({ ...item, [field]: e.currentTarget.value });
    };

    const buildCamerasFields = (el) => {
        if (el.key === "storage_id" || el.key === "bucket_id") {
            return (
                <Select
                    allowClear
                    style={{
                        width: "100%"
                    }}
                    placeholder={t(`${el.placeholder}`)}
                    defaultValue={editMode ? (el.key === "storage_id" ? storage.name : bucket.name) : null}
                    onChange={(value) => setItem({ ...item, [el.key]: value })
                    }
                >
                    {el.key === "storage_id" ? optionsStorages : optionsBucket}
                </Select>
            );
        } else
            return (
                <Input
                    value={item[el.key]}
                    onChange={handleInput(el.key)}
                    placeholder={t(`${el.placeholder}`)}
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
            title={editMode ? t("edit_camera") : t("create_camera")}
        >
            {cameraFields.map((el, index) => (
                <div key={index} className="camera-field">
                    <p>{t(`${el.label}`)}</p>
                    {buildCamerasFields(el)}
                </div>
            ))}
        </GeneralModalWrapper>
    );
};

export default React.memo(CameraModal);
