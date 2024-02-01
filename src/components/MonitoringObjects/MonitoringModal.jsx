import React, { useRef, useState } from "react";
import { Button, Input, message } from "antd";
import { GeneralModalWrapper } from "../general/GeneralModalWrapper";
import { UploadOutlined } from "@ant-design/icons";
import "./MonitoringObjects.scss";

const MonitoringModal = ({ t, open, item, handleCancel, handleSubmit, setItem, mode }) => {
    const avaRef = useRef();

    const [filename, setFilename] = useState("");

    const editMode = mode === "edit";

    const handleInput = (field) => (e) => {
        setItem({ ...item, [field]: e.currentTarget.value });
    };

    const onAvatarSelected = (e) => {
        if (e.target.files && e.target.files.length) {
            if(e.target.files[0].size > 3072000) {
                message.error(t("image_size_warning"));
            } else {
                setFilename(e.target.files[0].name);
                setItem({...item, picture: e.target.files[0]});
            }
        }
    };

    const disabledBtn = !item.name || !item.description;
    
    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "edit" : "create"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={disabledBtn}
        >
            <h2>{editMode ? t("edit_monitoring_object") : t("create_monitoring_object")}</h2>
            <section>
                <label>{t("name")}</label>
                <Input value={item.name} onChange={handleInput("name", "create_object")} placeholder={t("enter_name")} />
            </section>
            <section>
                <label>{t("description")}</label>
                <Input value={item.description} onChange={handleInput("description", "create_object")} placeholder={t("enter_description")} />
            </section>
            {!editMode && <section>
                <label>{t("choose_picture")}:</label>
                <div onClick={() => avaRef.current.click()} className="photo-wrap">
                    <Button icon={<UploadOutlined />}>{t("click_upload")}</Button>
                </div>
                <p style={{opacity: 0.6, margin: 0}}>{filename}</p>
                <input type="file" ref={avaRef} style={{ display: "none" }} onChange={onAvatarSelected} accept="image/jpeg,image/png" />
            </section>}
        </GeneralModalWrapper>
    );
};

export default React.memo(MonitoringModal);
