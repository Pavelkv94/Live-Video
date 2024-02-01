import { Button, Card, Input, InputNumber, Radio, Select, Switch } from "antd";
import React, { useState } from "react";
import { initTrackerTariff, tariffTrackerDatafields } from "../../../general/initialData";
import "./AdminCreateTariffTrackersTab.scss";
import { useDispatch, useSelector } from "react-redux";
import { createTariffAndAssign, createTrackerTariff } from "../../../../redux/tariffsReducer";

const AdminCreateTariffTab = ({ t }) => {
    const dispatch = useDispatch();

    const [tariff, setTariff] = useState(initTrackerTariff);
    const [tariffType, setTariffType] = useState("common");
    const [selectedUser, setSelectedUser] = useState(null);

    const users = useSelector((state) => state.usersReducer.usersList);

    const options = users.map((el) => ({ label: el.name, value: el.id }));

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
            dispatch(createTrackerTariff(tariff));
        } else {
            dispatch(createTariffAndAssign(selectedUser, tariff));
        }
        setSelectedUser(null);
        setTariff(initTrackerTariff);
    };

    const disableBtnCommon =
        !tariff.name ||
        !tariff.max_routes ||
        !tariff.price ||
        !tariff.history ||
        !tariff.max_trackers ||
        !tariff.credit_days ||
        !tariff.discount6 ||
        !tariff.discount12;

    const disableBtnInd = disableBtnCommon || (!selectedUser && selectedUser !== 0);

    return (
        <div className="create-tariff">
            <div className="create-tariff-type">
                <Radio.Group value={tariffType} onChange={handleChangeTariffType}>
                    <Radio value="common">{t("common_tariff")}</Radio>
                    <Radio value="individual">{t("individual_tariff")}</Radio>
                </Radio.Group>
                {tariffType === "individual" && (
                    <Select
                        showSearch
                        placeholder={t("select_user")}
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                        options={options}
                    />
                )}
            </div>
            <Card>
                {tariffTrackerDatafields.map((el, index) => (
                    <div key={index} className="tariff-form-item">
                        <p>{t(`${el.name}`)}</p>
                        <div className="tariff-form-item-input">
                            {el.name === "name" ? (
                                <Input value={tariff[el.name]} onChange={handleInputChange(el.name)} placeholder={t("enter_name")} />
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
                    {t("create_tariff")}
                </Button>
            </Card>
        </div>
    );
};

export default React.memo(AdminCreateTariffTab);
