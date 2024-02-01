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
        !editMode && (isAll ? setItem({ ...item, users: users.map((el) => el.id) }) : setItem({ ...item, users: [] }));
    }, [isAll]);

    const handleInput = (field) => (e) => {
        setItem({ ...item, [field]: e.currentTarget.value });
    };

    const handleSelect = (value) => {
        setItem({ ...item, users: value });
    };

    const options = users.map((el) => ({ label: el.name, value: el.id }));

    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "edit" : "send"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!item.text || !item.title ||  item.users.length === 0}
        >
            <h2>{editMode ? t("edit_notification") : t("create_notification")}</h2>
            <section>
                <label>{t("type")}:</label>
                <br />
                <Radio.Group name="radiogroup" defaultValue={editMode ? item.type : "info"} onChange={e => setItem({...item, type: e.target.value})}>
                    <Radio value={"info"}>
                        <span style={{ color: "#1677ff" }}>{t("info")}</span>
                    </Radio>
                    <Radio value={"warning"}>
                        <span style={{ color: "#faad14" }}>{t("warning")}</span>
                    </Radio>
                    <Radio value={"error"}>
                        <span style={{ color: "#ff4d4f" }}>{t("error")}</span>
                    </Radio>
                </Radio.Group>
            </section>
            <section>
                <label>{t("title")}:</label>
                <Input value={item.title} onChange={handleInput("title")} placeholder={t("enter_title")} />
            </section>
            <section>
                <label>{t("text")}:</label>
                <TextArea value={item.text} onChange={handleInput("text")} placeholder={t("enter_text")} rows={6} />
            </section>
            <section>
                <label>{t("users")}:</label>
                <div className="select-all">
                    <Switch checked={isAll} onChange={(checked) => setIsAll(checked)} />
                    {t("select_all")}
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
