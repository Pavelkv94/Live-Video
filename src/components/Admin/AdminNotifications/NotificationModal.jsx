import React, { useEffect, useState } from "react";
import { Input, Radio, Select, Switch } from "antd";
import { GeneralModalWrapper } from "../../general/GeneralModalWrapper";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import "./AdminNotifications.scss";

const NotificationModal = ({ t, open, item, handleCancel, handleSubmit, setItem, mode }) => {
    const editMode = mode === "edit";

    const users = useSelector((state) => state.usersReducer.usersList);

    const [isAll, setIsAll] = useState(false);

    useEffect(() => {
        !editMode && (isAll ? setItem({ ...item, users: users.map((el) => el.user_id) }) : setItem({ ...item, users: [] }));
    }, [isAll]);

    const handleInput = (field) => (e) => {
        setItem({ ...item, [field]: e.currentTarget.value });
    };

    const handleSelect = (value) => {
        setItem({ ...item, users: value });
    };

    const options = users.map((el) => ({ label: el.user_name, value: el.user_id }));

    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "edit" : "send"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!item.text || !item.title ||  item.users.length === 0}
        >
            <h2>{editMode ? t("notifications.editNotification") : t("notifications.createNotification")}</h2>
            <section>
                <label>{t("common.type")}:</label>
                <br />
                <Radio.Group name="radiogroup" defaultValue={editMode ? item.type : "info"} onChange={e => setItem({...item, type: e.target.value})}>
                    <Radio value={"info"}>
                        <span style={{ color: "#1677ff" }}>{t("notifications.info")}</span>
                    </Radio>
                    <Radio value={"warning"}>
                        <span style={{ color: "#faad14" }}>{t("notifications.warning")}</span>
                    </Radio>
                    <Radio value={"error"}>
                        <span style={{ color: "#ff4d4f" }}>{t("notifications.error")}</span>
                    </Radio>
                </Radio.Group>
            </section>
            <section>
                <label>{t("common.title")}:</label>
                <Input value={item.title} onChange={handleInput("title")} placeholder={t("common.enterTitle")} />
            </section>
            <section>
                <label>{t("common.text")}:</label>
                <TextArea value={item.text} onChange={handleInput("text")} placeholder={t("common.enterText")} rows={6} />
            </section>
            <section>
                <label>{t("common.users")}:</label>
                <div className="select-all">
                    <Switch checked={isAll} onChange={(checked) => setIsAll(checked)} />
                    {t("notifications.selectAll")}
                </div>

                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={item.users}
                    onChange={handleSelect}
                    options={options}
                    disabled={isAll}
                />
            </section>
        </GeneralModalWrapper>
    );
};

export default React.memo(NotificationModal);
