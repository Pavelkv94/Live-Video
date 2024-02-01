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

    const disableFiz = !item.name || !item.email || !item.info || !item.prefered_map
        || !item.phone || !item.password || !item.password_confirmation;

    const disableEditFiz = !item.name || !item.email || !item.info || !item.prefered_map
    || !item.phone;


    const disableUr = disableFiz || !item.legal_address || !item.post_address || !item.unp || !item.bank_info || !item.bank_account;

    const registrationDisableButton = urUser ? disableUr : disableFiz;
    const editDisableButton = urUser ? (disableUr || disableEditFiz): disableEditFiz;

    const onChange = (key) => (val) => {
        setItem({ ...item, [key]: val });
    };

    const onSwithcUser = (key) => (change) => {
        setItem({ ...item,  [key]: change ? 1 : 0,
            bank_account: change ? item.bank_account : "",
            bank_info: change ? item.bank_info : "",
            unp: change ? item.unp : "" });
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
                    { value: "google", label: t("google") },
                    { value: "yandex", label: t("yandex") },
                    { value: "osm", label: t("osm") }
                ]}
            />;
        case "password":
        case "password_confirmation":
            return <Input.Password placeholder={t(el.placeholder)} value={item[el.key]} onChange={handleInput(el.key)} autoComplete="new-password"/>;
        default: return <Input placeholder={t(el.placeholder)} value={item[el.key]} onChange={handleInput(el.key)} />;
        }
    };
    const fields = editMode ? editFields : regFields;

    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "save_profile" : "sign_up"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={editMode ? editDisableButton : registrationDisableButton}   
        >
            <h2>{t(editMode ? "edit_user" : "create_new_user")}</h2>
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
                        <label>{urUser ? t("legal_entity") : t("individual_entity")}</label>
                        <Switch checked={item["business_type"]} onChange={onSwithcUser("business_type")} />
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