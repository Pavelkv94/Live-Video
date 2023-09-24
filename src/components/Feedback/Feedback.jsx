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

    const onFinish = (values) => {
        dispatch(sendFeedback(values));
    };

    return (
        <div className="feedback">
            <section className="head-section">
                <h2>{t("menuBar.feedback")}</h2>
            </section>
            <section className="feedback-content">
                <Card>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <div>
                            <Form.Item name={["formrequest_name"]} label={t("common.name")}>
                                <Input placeholder={t("common.enterName")} />
                            </Form.Item>
                            <Form.Item
                                name={["formrequest_email"]}
                                label={t("common.email")}
                                rules={[
                                    {
                                        type: "email"
                                    }
                                ]}
                            >
                                <Input placeholder={t("common.enterEmail")} />
                            </Form.Item>
                            <Form.Item
                                name={["formrequest_tel"]}
                                label={t("common.phone")}
                                rules={[
                                    {
                                        type: "phone"
                                    }
                                ]}
                            >
                                <Input placeholder={t("common.enterPhone")} />
                            </Form.Item>
                            <Form.Item name={["formrequest_message"]} label={t("common.message")}>
                                <Input.TextArea rows={8} placeholder={t("common.enterMessage")} />
                            </Form.Item>
                        </div>

                        <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                offset: 4
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                {t("common.submit")}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card type="inner" title={t("feedback.contacts")}>
                    <b>Online Monitoring System</b>
                    <br />
                    <br />
                    <b>Phone Number:</b> 123123123
                    <br />
                    <br />
                    <b>Email:</b> <a href="#">test@gmail.com</a>
                    <br />
                    <br />
                    <b>Skype:</b> <a href="#">oms@skype</a>
                </Card>
            </section>
        </div>
    );
};

export default React.memo(Feedback);
