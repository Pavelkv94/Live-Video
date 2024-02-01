import { Input } from "antd";
import React from "react";
import { GeneralModalWrapper } from "../general/GeneralModalWrapper";

const SendLinkToEmailModal = ({ t, open, item, handleCancel, handleSubmit, setItem }) =>
{
    const handleInput = (field) => (e) =>
    {
        setItem({ ...item, [field]: e.currentTarget.value });
    };

    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!item.email}
            action={"send_code"}
        >
            <h2>{t("restore_password")}</h2>
            <section>
                <label>{t("email")}</label>
                <Input
                    placeholder={t("enter_email")}
                    value={item.email}
                    onChange={handleInput("email")}
                />
            </section>
        </GeneralModalWrapper>
    );
};

export default React.memo(SendLinkToEmailModal);