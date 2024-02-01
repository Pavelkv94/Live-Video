import { Input } from "antd";
import React from "react";
import { GeneralModalWrapper } from "../general/GeneralModalWrapper";

const RestorePasswordModal = ({ t, open, handleCancel, handleSubmit, item, setItem }) => {

    const handleInput = (field) => (e) => {
        setItem({ ...item, [field]: e.currentTarget.value });
    };

    const inputs = [
        {
            name: "new_pass",
            field: "user_pass",
            placeholder: "enter_password"
        },
        {
            name: "confirm_new_pass",
            field: "user_pass_confirmation",
            placeholder: "confirm_pass"
        }
    ];
    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={"restore_pass"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!item.user_pass || !item.user_pass_confirmation}
        >
            <h2>{t("restore_password")}</h2>
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