import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authReducer";
import "./Login.scss";
import { Navigate } from "react-router";

export const LoginAdmin = ({ t }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const authStatus = useSelector((state) => state.authReducer.authStatus);

    const onFinish = (values) => {
        dispatch(loginUser({...values, admin: true})); //for admin
    };

    if (user) {
        return <Navigate to={"/monitoring"} />;
    }

    return (
        <div className="login-page">
            <h2>{t("login.logIn")} Admin</h2>
            <Card>
                <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        className="field"
                        label={t("common.email")}
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: t("login.pleaseEnterEmail")
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined />} size="large" />
                    </Form.Item>

                    <Form.Item
                        className="field"
                        label={t("login.password")}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t("login.pleaseEnterPass")
                            }
                        ]}
                    >
                        <Input.Password size="large" />
                    </Form.Item>
                    <div className="login-actions">
                        <Button type="primary" htmlType="submit">
                            {t("login.signIn")}
                        </Button>
                    </div>
                </Form>
                {authStatus === "pending" && (
                    <div className="loader">
                        <Spin />
                    </div>
                )}
            </Card>
        </div>
    );
};
