import React, { useEffect, useState } from "react";
import "./Notifications.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllNotifications, deleteNotifications, fetchNotifications, viewAllNotifications, viewNotification } from "../../redux/notificationsReducer";
import { Button, List, Space, Tooltip } from "antd";
import { CheckCircleOutlined, CloseCircleFilled, DeleteFilled, InfoCircleFilled, MailOutlined, WarningFilled } from "@ant-design/icons";
import { dateConvert } from "../../utils/dateConvert";
import { DeleteModal } from "../general/DeleteModal";

const Notifications = ({ t, isMobileSize }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const notifications = useSelector((state) => state.notificationsReducer.notificationsList);

    const [checkedNote, setCheckedNote] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(fetchNotifications(user.id));
    }, [dispatch]);

    const handleSubmitDeleteModal = () => {
        dispatch(deleteNotifications(checkedNote.id));
        setCheckedNote(null);
        setOpenDeleteModal(false);
    };

    return (
        <div className="notifications">
            <section className="head-section">
                <h2>{t("notifications")}</h2>
                {notifications.length > 0 && (
                    <div className="main-actions">
                        <Button onClick={() => dispatch(viewAllNotifications(user.id))} size={isMobileSize ? "small" : "middle"}>
                            {t("mark_all_as_viewed")}
                        </Button>
                        <Button onClick={() => dispatch(deleteAllNotifications(user.id))} danger size={isMobileSize ? "small" : "middle"}>
                            {t("delete_all")}
                        </Button>
                    </div>
                )}
            </section>

            <List
                itemLayout="vertical"
                size="large"
                className="list"
                dataSource={notifications}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <Tooltip placement="bottom" title={t("delete_notify")} key={index}>
                                <div
                                    className="notification-action-icon"
                                    onClick={() => {
                                        setCheckedNote(item);
                                        setOpenDeleteModal(true);
                                    }}
                                >
                                    <DeleteFilled style={{ fontSize: "16px" }} />
                                </div>
                            </Tooltip>,
                            !item.viewed_at ? (
                                <Space key={index} className="notification-action-icon-text" onClick={() => dispatch(viewNotification(item.id))}>
                                    <MailOutlined style={{ fontSize: "18px" }} />
                                    {t("mark_as_viewed")}
                                </Space>
                            ) : (
                                <Space key={index}>
                                    <CheckCircleOutlined style={{ fontSize: "18px" }} />
                                    {t("viewed")}
                                </Space>
                            )
                        ]}
                        style={!item.viewed_at ? { background: "#f5f5f5" } : { background: "#FFFFFF" }}
                    >
                        <List.Item.Meta
                            avatar={
                                item.type === "info" ? (
                                    <InfoCircleFilled style={{ fontSize: "40px", color: "#1677ff" }} />
                                ) : item.type === "warning" ? (
                                    <WarningFilled style={{ fontSize: "40px", color: "#faad14" }} />
                                ) : (
                                    <CloseCircleFilled style={{ fontSize: "40px", color: "#ff4d4f" }} />
                                )
                            }
                            title={`[${item.type.toUpperCase()}] - ${item.title}`}
                            description={dateConvert(item.created_at)}
                        />
                        {item.text}
                    </List.Item>
                )}
            />

            {openDeleteModal && (
                <DeleteModal
                    isModalVisible={openDeleteModal}
                    setIsModalVisible={setOpenDeleteModal}
                    submitModal={handleSubmitDeleteModal}
                    item="notification"
                    t={t}
                />
            )}
        </div>
    );
};

export default React.memo(Notifications);
