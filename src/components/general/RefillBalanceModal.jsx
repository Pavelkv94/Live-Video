import React from "react";
import { GeneralModalWrapper } from "./GeneralModalWrapper";
import { InputNumber } from "antd";

const RefillBalanceModal = ({ t, handleSubmit, handleCancel, isModalVisible, refillAmount, setRefillAmount }) => {
    const handleChangeRefillAmount = (value) => setRefillAmount(value);

    return (
        <GeneralModalWrapper
            t={t}
            open={isModalVisible}
            action={t("refill_balance")}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!refillAmount || refillAmount < 0}
        >
            <h2>{t("refill_balance")}</h2>
            <InputNumber value={refillAmount} onChange={handleChangeRefillAmount} style={{width: 200, marginTop: "10px"}}/>
        </GeneralModalWrapper>
    );
};

export default RefillBalanceModal;
