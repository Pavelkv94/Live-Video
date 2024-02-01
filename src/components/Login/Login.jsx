import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Spin, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, restorePassword, sendLinkToEmail } from "../../redux/authReducer";
import "./Login.scss";
import { Navigate, useLocation } from "react-router";
import RestorePasswordModal from "./RestorePasswordModal";
import { useEffect } from "react";
import SendLinkToEmailModal from "./SendLinkToEmailModal";
import { initialRegData } from "../general/initialData";
import { fetchData } from "../../api/api";
import * as ActionTypes from "../../redux/AppConstants";
import RegistrationModal from "./RegistrationModal";
import packageJson from "../../../package.json";

export const Login = ({ t }) => {
    const { search } = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const authStatus = useSelector((state) => state.authReducer.authStatus);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isSendLinkModalVisible, setIsSendLinkModalVisible] = useState(false);
    const [isRestorePassModalVisible, setIsRestorePassModalVisible] = useState(false);
    const [regData, setRegData] = useState(initialRegData);
    const [restoreCred, setRestoreCred] = useState({});
    const [token, setToken] = useState("");

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

    const onFinish = (values) => {
        // dispatch(loginUser({...values, admin: true})); //for admin
        dispatch(loginUser(values));
    };

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    const handleCreateCancel = () => {
        setIsCreateModalVisible(false);
        setRegData(initialRegData);
    };

    const handleCreateUser = () => {
        dispatch(registerUser(regData));
        handleCreateCancel();
    };

    const showRestoreModal = () => {
        setIsSendLinkModalVisible(true);
    };

    const handleSendLinkCancel = () => {
        setIsSendLinkModalVisible(false);
        setRestoreCred({});
    };

    const handleSendLink = () => {
        dispatch(sendLinkToEmail({ ...restoreCred, source_page: "login" }));
        handleSendLinkCancel();
    };

    const handleRestorePasswordCancel = () => {
        setIsRestorePassModalVisible(false);
        setRestoreCred({});
    };

    const handleRestorePassword = () => {
        dispatch(restorePassword(token, restoreCred));
        handleRestorePasswordCancel();
    };

    if (user) {
        return <Navigate to={"/monitoring"} />;
    }

    return (
        <div className="login-page">
            <h2>{t("login").toUpperCase()}</h2>
            <br/>
            <Card>
                <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        className="field"
                        label={t("email")}
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: t("please_enter_email")
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined />} size="large" />
                    </Form.Item>

                    <Form.Item
                        className="field"
                        label={t("password")}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t("please_enter_pass")
                            }
                        ]}
                    >
                        <Input.Password size="large" />
                    </Form.Item>
                    <div className="login-actions">
                        <Button type="primary" onClick={showRestoreModal}>
                            {t("forgot_pass")}
                        </Button>
                        <Button type="primary" onClick={showCreateModal}>
                            {t("sign_up")}
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {t("sign_in")}
                        </Button>
                    </div>
                </Form>
                {authStatus === "pending" && (
                    <div className="loader">
                        <Spin />
                    </div>
                )}
            </Card>
            <p style={{ color: "white" }}>v{packageJson.version}</p>

            <a className="goToAdmin" href="/loginAdmin">Are you an admin?</a>
            {isCreateModalVisible && (
                <RegistrationModal
                    t={t}
                    open={isCreateModalVisible}
                    handleCancel={handleCreateCancel}
                    handleSubmit={handleCreateUser}
                    mode={"create"}
                    item={regData}
                    setItem={setRegData}
                />
            )}

            {isSendLinkModalVisible && (
                <SendLinkToEmailModal
                    t={t}
                    open={isSendLinkModalVisible}
                    handleCancel={handleSendLinkCancel}
                    handleSubmit={handleSendLink}
                    item={restoreCred}
                    setItem={setRestoreCred}
                />
            )}

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
