import { Input, Select, Switch } from "antd";
import React from "react";
import { useState } from "react";
import { GeneralModalWrapper } from "../general/GeneralModalWrapper";
import { editFields, regFields } from "../general/initialData";

const RegistrationModal = ({ t, open, handleCancel, handleSubmit, item, setItem, mode }) => {

    const [urUser, setUrUser] = useState(false);
    const editMode = mode === "edit";

    const handleInput = (key) => (e) => {
        setItem({ ...item, [key]: e.currentTarget.value });
    };

    const disableFiz = !item.user_name || !item.user_mail || !item.user_info || !item.prefered_map
        || !item.user_phone || !item.user_pass || !item.user_pass_confirmation;

    const disableEditFiz = !item.user_name || !item.user_mail || !item.user_info || !item.prefered_map
    || !item.user_phone;


    const disableUr = disableFiz || !item.user_uradress || !item.user_postadress || !item.user_ynp || !item.user_bank || !item.user_rschet;

    const registrationDisableButton = urUser ? disableUr : disableFiz;
    const editDisableButton = urUser ? (disableUr || disableEditFiz): disableEditFiz;

    const onChange = (key) => (val) => {
        setItem({ ...item, [key]: val });
    };

    const onSwithcUser = (key) => (change) => {
        setItem({ ...item, [key]: change });
        setUrUser(change);
    };

    const buildRegisterkeys = (el) => {
        switch (el.key) {
        case "prefered_map":
            return <Select
                style={{ width: 150 }}
                onChange={onChange(el.key)}
                placeholder={t(el.placeholder)}
                defaultValue={item.prefered_map}
                options={[
                    { value: "google", label: t("common.google") },
                    { value: "yandex", label: t("common.yandex") },
                    { value: "osm", label: t("common.osm") }
                ]}
            />;
        case "user_pass":
        case "user_pass_confirmation":
            return <Input.Password placeholder={t(el.placeholder)} value={item[el.key]} onChange={handleInput(el.key)} />;
        default: return <Input placeholder={t(el.placeholder)} value={item[el.key]} onChange={handleInput(el.key)} />;
        }
    };
    const fields = editMode ? editFields : regFields;

    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "saveProfile" : "signUp"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={editMode ? editDisableButton : registrationDisableButton}   
        >
            <h2>{t(editMode ? "admin.editUser" : "login.createNewUser")}</h2>
            <div className="reg-container">
                <div className="fields-wrapper">
                    {fields[0].map(input => (
                        <section key={input.label}>
                            <label>{t(input.label)}</label>
                            {buildRegisterkeys(input)}
                        </section>
                    ))}
                </div>
                <div className="fields-wrapper">
                    {fields[1].map(input => (
                        <section key={input.label}>
                            <label>{t(input.label)}</label>
                            {buildRegisterkeys(input)}
                        </section>
                    ))}
                    <section className="switch">
                        <label>{urUser ? t("login.userUr") : t("login.userFiz")}</label>
                        <Switch checked={item["user_fiz_ur"]} onChange={onSwithcUser("user_fiz_ur")} />
                    </section>
                    {urUser &&
                        fields[2].map(input => (
                            <section key={input.label}>
                                <label>{t(input.label)}</label>
                                {buildRegisterkeys(input)}
                            </section>
                        ))
                    }
                </div>
            </div>
        </GeneralModalWrapper>
    );
};

export default React.memo(RegistrationModal);