import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { setCurrentUser } from "../../redux/authReducer";
import "./Login.css";

export const Login = () => {
    const dispatch = useDispatch();
    const initialRegData = { email: "", password: "" };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [regData, setRegData] = useState(initialRegData);

    const users = useSelector((state) => state.authReducer.users);
    const user = useSelector((state) => state.authReducer.user);

    const errorMessage = (err) => {
        message.error(err);
    };

    // useEffect(() => {
    //     error !== null && error !== undefined && errorMessage(error);
    // }, [error]);

    const onFinish = (values) => {
        let currentUser = users.filter((e) => e.email === values.email)[0];
        if (currentUser) {
            dispatch(setCurrentUser(currentUser)) ;
            let savedUser = JSON.stringify(currentUser);
            localStorage.setItem("user", savedUser);
        } 
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        //    dispatch(registerUser(regData))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (user) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="login-page">
            <h2>LOGIN</h2>
            <Card>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        className="field"
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!",
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} size="large" />
                    </Form.Item>

                    <Form.Item
                        className="field"
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                        ]}
                    >
                        <Input.Password size="large" />
                    </Form.Item>
                    <div className="login-actions">
                        <Button type="primary" onClick={showModal}>
                            Sign Up
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onFinish}
                        >
                            Sign In
                        </Button>
                    </div>
                </Form>
            </Card>

            <Modal
                title="New User Registration"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button
                        key="ok"
                        onClick={handleOk}
                        type="primary"
                        disabled={!regData.password || !regData.email}
                    >
                        Sign Up
                    </Button>,
                ]}
            >
                <div className="register-field">
                    <p>User Name:</p>
                    <Input
                        value={regData.email}
                        onChange={(e) =>
                            setRegData({
                                ...regData,
                                email: e.currentTarget.value,
                            })
                        }
                    />
                </div>
                <div className="register-field">
                    <p>Password</p>
                    <Input.Password
                        value={regData.password}
                        onChange={(e) =>
                            setRegData({
                                ...regData,
                                password: e.currentTarget.value,
                            })
                        }
                    />
                </div>
            </Modal>
        </div>
    );
};
