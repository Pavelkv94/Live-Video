import React from "react";
import "./Feedback.scss";
import { Button, Card, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { sendFeedback } from "../../redux/usersReducer";

const Feedback = ({ t }) => {
    const dispatch = useDispatch();

    const layout = {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    };

    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not a valid email!",
            number: "${label} is not a valid number!"
        },
        number: {
            range: "${label} must be between ${min} and ${max}"
        }
    };

    const phoneRegex = /^(\+\d{11}|\d{11})$/;

    const onFinish = (values) => {
        dispatch(sendFeedback(values));
    };

    return (
        <div className="feedback">
            <section className="head-section">
                <h2>{t("feedback")}</h2>
            </section>
            <section className="feedback-content">
                <Card>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <div>
                            <Form.Item
                                name={["sender_name"]}
                                label={t("name")}
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input placeholder={t("enter_name")} />
                            </Form.Item>
                            <Form.Item
                                name={["sender_email"]}
                                label={t("email")}
                                rules={[
                                    {
                                        type: "email",
                                        required: true
                                    }
                                ]}
                            >
                                <Input placeholder={t("enter_email")} />
                            </Form.Item>
                            <Form.Item
                                name={["sender_phone"]}
                                label={t("phone")}
                                rules={[
                                    {
                                        required: true,
                                        message: "Phone number is required!"
                                    },
                                    {
                                        pattern: phoneRegex,
                                        message: "Please enter a valid phone number!"
                                    }
                                ]}
                            >
                                <Input placeholder={t("enter_phone")} />
                            </Form.Item>
                            <Form.Item
                                name={["text"]}
                                label={t("message")}
                                rules={[
                                    {
                                        type: "phone",
                                        required: true
                                    }
                                ]}
                            >
                                <Input.TextArea rows={8} placeholder={t("enter_message")} />
                            </Form.Item>
                        </div>

                        <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                offset: 0
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                {t("submit")}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card type="inner" title={t("contacts")}>
                    <b>Online Monitoring System</b>
                    <br />
                    <br />
                    <b>{t("phone_number")}:</b> 123123123
                    <br />
                    <br />
                    <b>{t("email")}:</b> <a href="#">test@gmail.com</a>
                    <br />
                    <br />
                    <b>{t("skype")}:</b> <a href="#">oms@skype</a>
                </Card>
            </section>
        </div>
    );
};

export default React.memo(Feedback);
