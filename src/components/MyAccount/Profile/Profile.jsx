import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Button, Card, Input, Select, Switch, message  } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { restorePassword, sendLinkToEmail, updateUser } from "../../../redux/authReducer";
import { updateUserFields } from "../../general/initialData";
import { omit } from "../../../utils/omit";
import {useLocation} from "react-router";
import {fetchData} from "../../../api/api";
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

        if(token) {
            const request = fetchData(ActionTypes.passwordRecoveryToken(token), {}, {});
            request.then(() => {
                setToken(token);
                setIsRestorePassModalVisible(true);
            }, () => message.error(t("login.somthingError")));
        }

    }, [token]);

    const removeFields = ["user_id", "user_mail_verif", "user_name2", "user_port",
        "user_regtime", "user_service", "user_session_lifetime", "user_bank", "user_vip", "user_ynp", "user_rschet", "user_balance"];

    const updatedUser = omit(user, ...removeFields);
    const [updateData, setUpdateData] = useState(updatedUser);

    const [urUser, setUrUser] = useState(user.user_fiz_ur);

    const handleInput = (key) => (e) => {
        setUpdateData({ ...updateData, [key]: e.currentTarget.value });
    };

    const onChange = (key) => (val) => {
        setUpdateData({ ...updateData, [key]: val });
    };

    const onSwithcUser = (key) => (change) => {
        setUpdateData({ ...updateData, [key]: change });
        setUrUser(change);
    };

    const resetPass = () => {
        dispatch(sendLinkToEmail({email : user.user_mail, source_page: "profile"}));
    };

    const onSave = () => {
        dispatch(updateUser(user.user_id, updateData));
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
            return <Select
                style={{width: 150, float: "right" }}
                onChange={onChange(el.key)}
                placeholder={t(el.placeholder)}
                defaultValue={updateData.prefered_map}
                options={[
                    { value: "google", label: t("common.google") },
                    { value: "yandex", label: t("common.yandex") },
                    { value: "osm", label: t("common.osm") }
                ]}
            />;
        case "user_pass":
            return <Input.Password placeholder={t(el.placeholder)} value={updateData[el.key]} onChange={handleInput(el.key)} />;
        default: return <Input placeholder={t(el.placeholder)} value={updateData[el.key]} onChange={handleInput(el.key)} />;
        }
    };

    return (
        <div className="profile">
            <section className="head-section">
                <h2>{t("menuBar.profile")}</h2>
            </section>
            <Card className="card">
                <div className="fields-container">
                    <div className="fields-wrapper">
                        {updateUserFields[0].map(input => (
                            <section key={input.label}>
                                <label>{t(input.label)}</label>
                                {buildRegisterkeys(input)}
                            </section>
                        ))}
                        <div className="buttons">
                            <Button  onClick={onSave} type="primary">
                                {t("myAccount.saveProfile")}
                            </Button>
                            <Button  onClick={resetPass} type="default">
                                {t("myAccount.resetPassword")}
                            </Button>
                        </div>
                    </div>
                    <div className="fields-wrapper">
                        {updateUserFields[1].map(input => (
                            <section key={input.label}>
                                <label>{t(input.label)}</label>
                                {buildRegisterkeys(input)}
                            </section>
                        ))}
                        <section className="switch">
                            <label>{urUser ? t("login.userUr") : t("login.userFiz")}</label>
                            <Switch style={{marginLeft: 15}} checked={updateData["user_fiz_ur"]} onChange={onSwithcUser("user_fiz_ur")} />
                        </section>
                        {urUser &&
                            updateUserFields[2].map(input => (
                                <section key={input.label}>
                                    <label>{t(input.label)}</label>
                                    {buildRegisterkeys(input)}
                                </section>
                            ))
                        }
                    </div>
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
        </div >
    );
};

export default React.memo(Profile);