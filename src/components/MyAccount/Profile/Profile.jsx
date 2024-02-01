import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Button, Card, Input, Select, Switch, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { restorePassword, sendLinkToEmail, updateUser } from "../../../redux/authReducer";
import { updateUserFields } from "../../general/initialData";
import { omit } from "../../../utils/omit";
import { useLocation } from "react-router";
import { fetchData } from "../../../api/api";
import * as ActionTypes from "../../../redux/AppConstants";
import RestorePasswordModal from "../../Login/RestorePasswordModal";

const Profile = ({ t }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const { search } = useLocation();
    const [token, setToken] = useState("");
    const [isRestorePassModalVisible, setIsRestorePassModalVisible] = useState(false);
    const [restoreCred, setRestoreCred] = useState({});

    useEffect(() => {
        const token = new URLSearchParams(search).get("token");

        if (token) {
            const request = fetchData(ActionTypes.passwordRecoveryToken(token), {}, {});
            request.then(
                () => {
                    setToken(token);
                    setIsRestorePassModalVisible(true);
                },
                () => message.error(t("somthing_error"))
            );
        }
    }, [token]);

    const removeFields = [
        "id",
        "balance",
        "created_at",
        "updated_at",
        "active"
    ];

    const updatedUser = omit(user, ...removeFields);
    const [updateData, setUpdateData] = useState(updatedUser);

    const [urUser, setUrUser] = useState(user.business_type);

    const handleInput = (key) => (e) => {
        setUpdateData({ ...updateData, [key]: e.currentTarget.value });
    };

    const onChange = (key) => (val) => {
        setUpdateData({ ...updateData, [key]: val });
    };

    const onSwithcUser = (key) => (change) => {
        setUpdateData({ ...updateData, 
            [key]: change ? 1 : 0,
            bank_account: change ? updateData.bank_account : "",
            bank_info: change ? updateData.bank_info : "",
            unp: change ? updateData.unp : "" });
        setUrUser(change ? 1 : 0 );
    };

    const resetPass = () => {
        dispatch(sendLinkToEmail({ email: user.email, source_page: "profile" }));
    };

    const onSave = () => {
        dispatch(updateUser(user.id, updateData));
    };

    const handleRestorePasswordCancel = () => {
        setIsRestorePassModalVisible(false);
        setRestoreCred({});
    };

    const handleRestorePassword = () => {
        dispatch(restorePassword(token, restoreCred));
        handleRestorePasswordCancel();
    };

    const buildRegisterkeys = (el) => {
        switch (el.key) {
        case "prefered_map":
            return (
                <Select
                    style={{ width: 150, float: "right" }}
                    onChange={onChange(el.key)}
                    placeholder={t(el.placeholder)}
                    defaultValue={updateData.prefered_map}
                    options={[
                        { value: "google", label: t("google") },
                        { value: "yandex", label: t("yandex") },
                        { value: "osm", label: t("osm") }
                    ]}
                />
            );
        case "password":
            return <Input.Password placeholder={t(el.placeholder)} value={updateData[el.key]} onChange={handleInput(el.key)} />;
        default:
            return <Input placeholder={t(el.placeholder)} value={updateData[el.key]} onChange={handleInput(el.key)} />;
        }
    };

    return (
        <div className="profile">
            <section className="head-section">
                <h2>{t("profile")}</h2>
            </section>
            <Card className="card">
                <div className="fields-container">
                    <div className="fields-wrapper">
                        {updateUserFields[0].map((input) => (
                            <section key={input.label}>
                                <label>{t(input.label)}</label>
                                {buildRegisterkeys(input)}
                            </section>
                        ))}
                    </div>
                    <div className="fields-wrapper">
                        {updateUserFields[1].map((input) => (
                            <section key={input.label}>
                                <label>{t(input.label)}</label>
                                {buildRegisterkeys(input)}
                            </section>
                        ))}
                        <section className="switch">
                            <label>{urUser === 1 ? t("legal_entity") : t("individual_entity")}</label>
                            <Switch style={{ marginLeft: 15 }} checked={updateData["business_type"]} onChange={onSwithcUser("business_type")} />
                        </section>
                        {urUser === 1 &&
                            updateUserFields[2].map((input) => (
                                <section key={input.label}>
                                    <label>{t(input.label)}</label>
                                    {buildRegisterkeys(input)}
                                </section>
                            ))}
                    </div>
                </div>
                <div className="buttons">
                    <Button onClick={onSave} type="primary">
                        {t("save_profile")}
                    </Button>
                    <Button onClick={resetPass} type="default">
                        {t("reset_password")}
                    </Button>
                </div>
            </Card>
            {isRestorePassModalVisible && (
                <RestorePasswordModal
                    t={t}
                    open={isRestorePassModalVisible}
                    handleCancel={handleRestorePasswordCancel}
                    handleSubmit={handleRestorePassword}
                    item={restoreCred}
                    setItem={setRestoreCred}
                />
            )}
        </div>
    );
};

export default React.memo(Profile);
