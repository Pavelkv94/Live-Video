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
            action={"sendCode"}
        >
            <h2>{t("login.restorePassword")}</h2>
            <section>
                <label>{t("common.email")}</label>
                <Input
                    placeholder={t("common.enterEmail")}
                    value={item.email}
                    onChange={handleInput("email")}
                />
            </section>
        </GeneralModalWrapper>
    );
};

export default React.memo(SendLinkToEmailModal);