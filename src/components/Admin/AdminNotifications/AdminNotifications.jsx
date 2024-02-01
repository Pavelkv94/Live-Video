import React, { useEffect, useState } from "react";
import "./AdminNotifications.scss";
import { useDispatch, useSelector } from "react-redux";
import { createAdminNotifications, deleteAdminNotification, fetchAdminNotifications, updateAdminNotifications } from "../../../redux/notificationsReducer";
import { Button, Table } from "antd";
import { CheckCircleOutlined, CloseCircleFilled, DeleteOutlined, InfoCircleFilled, PlusOutlined, WarningFilled } from "@ant-design/icons";
import NotificationModal from "./NotificationModal";
import { initialNotification } from "../../general/initialData";
import { dateConvert } from "../../../utils/dateConvert";
import { DeleteModal } from "../../general/DeleteModal";
import Blocked from "../../general/Blocked";

const AdminNotifications = ({ t }) => {
    const dispatch = useDispatch();

    const notes = useSelector((state) => state.notificationsReducer.adminNotificationsList);
    const user = useSelector((state) => state.authReducer.user);

    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const [notification, setNotification] = useState(initialNotification);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [noteModalMode, setNoteModalMode] = useState("create");
    const [checkedNote, setCheckedNote] = useState(null);

    useEffect(() => {
        dispatch(fetchAdminNotifications());
    }, [dispatch]);

    const handleCancelCreateNotification = () => {
        setNotification(initialNotification);
        setOpenNotificationModal(false);
    };

    const handleCreateNotification = () => {
        dispatch(createAdminNotifications(notification));
        setNotification(initialNotification);
        setOpenNotificationModal(false);
    };

    const handleUpdateNotification = () => {
        dispatch(updateAdminNotifications(checkedNote.id, notification));
        setNotification(initialNotification);
        setCheckedNote(null);
        setOpenNotificationModal(false);
    };

    const handleSubmitDeleteModal = () => {
        dispatch(deleteAdminNotification(checkedNote.id));
        setCheckedNote(null);
        setOpenDeleteModal(false);
    };

    const columnsNotes = [
        {
            title: t("type"),
            dataIndex: "type",
            key: "type",
            render: (text, params) => (
                <div className="admin-notif-item">
                    {params.type === "info" ? (
                        <InfoCircleFilled style={{ fontSize: "24px", color: "#1677ff" }} />
                    ) : params.type === "warning" ? (
                        <WarningFilled style={{ fontSize: "24px", color: "#faad14" }} />
                    ) : (
                        <CloseCircleFilled style={{ fontSize: "24px", color: "#ff4d4f" }} />
                    )}
                    [{params.type.toUpperCase()}] - {params.title}
                </div>
            )
        },
        {
            title: t("number_users"),
            dataIndex: "number_users",
            key: "number_users",
            render: (text, params) => params.notified_users.length
        },
        {
            title: t("created"),
            dataIndex: "created",
            key: "created",
            render: (text, params) => dateConvert(params.created_at)
        },
        {
            title: t("actions"),
            dataIndex: "actions",
            key: "actions",
            render: (text, params) => (
                <div className="admin-notifications-actions">
                    {/* <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setNoteModalMode("edit");
                            setOpenNotificationModal(true);
                            setCheckedNote(params);
                            setNotification({text: params.text, type: params.type, users: params.notified_users.map(el => el.user_id)});
                        }}
                    /> */}
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => {
                            setOpenDeleteModal(true);
                            setCheckedNote(params);
                        }}
                    />
                </div>
            )
        }
    ];

    const data = notes.map((el) => ({ ...el, key: el.id }));

    if (!user?.admin) {
        return <Blocked status="403" title={t("access_denied")} message={t("havent_access")} />;
    }

    return (
        <div className="admin-notifications">
            <section className="head-section">
                <h2>{t("notifications_management")}</h2>
                <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setNoteModalMode("create");
                        setOpenNotificationModal(true);
                    }}
                />
            </section>

            <Table
                pagination={false}
                columns={columnsNotes}
                dataSource={data}
                expandable={{
                    expandedRowRender: (record) => (
                        <div style={{ margin: 0 }}>
                            <h4 style={{ margin: 0 }}>{t("note_text")}:</h4>
                            <p>{record.text}</p>
                            <h4 style={{ margin: 0 }}>{t("users")}:</h4>
                            <div className="note-users">
                                {record.notified_users.map((el, i) => (
                                    <div key={i} className="note-users-item">
                                        <div>
                                            <span>
                                                {el.name} {el.second_name},
                                            </span>
                                            <span>{el.email}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: el.viewed_at ? "#0b8235" : "#f81d22" }}>
                                                {el.viewed_at ? (
                                                    <>
                                                        <CheckCircleOutlined style={{ color: "#0b8235" }} /> {dateConvert(el.viewed_at)}
                                                    </>
                                                ) : (
                                                    <>{t("not_viewed")}</>
                                                )}
                                            </span>
                                            <span style={{ color: el.deleted_at ? "#f81d22" : "rgba(0, 0, 0, 0.7)" }}>
                                                <DeleteOutlined style={{ color: el.deleted_at ? "#f81d22" : "rgba(0, 0, 0, 0.7)" }} />
                                                {el.deleted_at ? dateConvert(el.deleted_at) : <>{t("not_deleted")}</>}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }}
            />
            {openNotificationModal && (
                <NotificationModal
                    t={t}
                    open={openNotificationModal}
                    handleCancel={handleCancelCreateNotification}
                    handleSubmit={noteModalMode === "create" ? handleCreateNotification : handleUpdateNotification}
                    mode={noteModalMode}
                    item={notification}
                    setItem={setNotification}
                />
            )}

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

export default React.memo(AdminNotifications);
