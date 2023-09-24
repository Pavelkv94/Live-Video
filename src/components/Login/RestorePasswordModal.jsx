import { Input } from "antd";
import React from "react";
import { GeneralModalWrapper } from "../general/GeneralModalWrapper";

const RestorePasswordModal = ({ t, open, handleCancel, handleSubmit, item, setItem }) => {

    const handleInput = (field) => (e) => {
        setItem({ ...item, [field]: e.currentTarget.value });
    };

    const inputs = [
        {
            name: "login.newPass",
            field: "user_pass",
            placeholder: "login.enterPass"
        },
        {
            name: "login.confirmNewPass",
            field: "user_pass_confirmation",
            placeholder: "login.confirmPass"
        }
    ];
    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={"restorePass"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!item.user_pass || !item.user_pass_confirmation}
        >
            <h2>{t("login.restorePassword")}</h2>
            {inputs.map(input => (
                <section key={input.name}>
                    <label>{t(input.name)}</label>
                    <Input.Password placeholder={t(input.placeholder)} value={item[input.field]} onChange={handleInput(input.field)} />
                </section>
            ))}
        </GeneralModalWrapper>
    );
};

export default React.memo(RestorePasswordModal);