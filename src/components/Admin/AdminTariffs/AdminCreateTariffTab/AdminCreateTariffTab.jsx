import { Button, Card, Input, InputNumber, Radio, Select, Switch } from "antd";
import React, { useState } from "react";
import { initTariff, tariffDatafields } from "../../../general/initialData";
import "./AdminCreateTariffTab.scss";
import { useDispatch, useSelector } from "react-redux";
import { createTariff, createTariffAndAssign } from "../../../../redux/tariffsReducer";

const AdminCreateTariffTab = ({ t }) => {
    const dispatch = useDispatch();

    const [tariff, setTariff] = useState(initTariff);
    const [tariffType, setTariffType] = useState("common");
    const [selectedUser, setSelectedUser] = useState(null);

    const users = useSelector((state) => state.usersReducer.usersList);

    const options = users.map((el) => ({ label: el.user_name, value: el.user_id }));

    const onChange = (value) => {
        setSelectedUser(value);
    };
    const onSearch = (value) => {
        /* eslint-disable no-console */

        console.log("search:", value);
    };

    const handleChangeTariffType = (e) => {
        setTariffType(e.target.value);
        e.target.value === "common" && setSelectedUser(null);
    };

    const handleInputChange = (field) => (e) => {
        setTariff({ ...tariff, [field]: e.target.value });
    };
    const handleInputNumber = (field) => (value) => {
        setTariff({ ...tariff, [field]: value });
    };

    const handleSwitchChange = (field) => (checked) => {
        setTariff({ ...tariff, [field]: checked });
    };

    const handleCreateTariff = () => {
        if (tariffType === "common") {
            dispatch(createTariff(tariff));
        } else {
            dispatch(createTariffAndAssign(selectedUser, tariff));
        }
        setSelectedUser(null);
        setTariff(initTariff);
    };

    const disableBtnCommon =
        !tariff.tariffobj_name ||
        !tariff.tariffobj_objdin ||
        !tariff.tariffobj_objdin_cost ||
        !tariff.tariffobj_history ||
        !tariff.tariffobj_trekcountobj ||
        !tariff.tariffobj_creditdays ||
        !tariff.tariffobj_discount6m ||
        !tariff.tariffobj_discount1y;

    const disableBtnInd = disableBtnCommon || (!selectedUser && selectedUser !== 0);

    return (
        <div className="create-tariff">
            <div className="create-tariff-type">
                <Radio.Group value={tariffType} onChange={handleChangeTariffType}>
                    <Radio value="common">{t("admin.commonTariff")}</Radio>
                    <Radio value="individual">{t("admin.individualTariff")}</Radio>
                </Radio.Group>
                {tariffType === "individual" && (
                    <Select
                        showSearch
                        placeholder={t("admin.selectUser")}
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                        options={options}
                    />
                )}
            </div>
            <Card>
                {tariffDatafields.map((el, index) => (
                    <div key={index} className="tariff-form-item">
                        <p>{t(`tariffs.${el.name}`)}</p>
                        <div className="tariff-form-item-input">
                            {el.name === "tariffobj_name" ? (
                                <Input value={tariff[el.name]} onChange={handleInputChange(el.name)} placeholder={t("common.enterName")} />
                            ) : el.boolean ? (
                                <Switch checked={tariff[el.name]} onChange={handleSwitchChange(el.name)} />
                            ) : (
                                <InputNumber value={tariff[el.name]} onChange={handleInputNumber(el.name)} placeholder="0" />
                            )}
                        </div>
                    </div>
                ))}
                <Button
                    type="primary"
                    style={{ float: "right" }}
                    disabled={tariffType === "common" ? disableBtnCommon : disableBtnInd}
                    onClick={handleCreateTariff}
                >
                    {t("admin.createTariff")}
                </Button>
            </Card>
        </div>
    );
};

export default React.memo(AdminCreateTariffTab);
