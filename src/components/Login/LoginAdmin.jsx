import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authReducer";
import "./Login.scss";
import { Navigate } from "react-router";
import packageJson from "../../../package.json";

export const LoginAdmin = ({ t }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const authStatus = useSelector((state) => state.authReducer.authStatus);

    const onFinish = (values) => {
        dispatch(loginUser({...values, admin: true, remember: false})); //for admin //todo remember: false
    };

    if (user) {
        return <Navigate to={"/adminUsers"} />;
    }

    return (
        <div className="login-page">
            <h2>{t("login").toUpperCase()} Admin</h2>
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

        </div>
    );
};
