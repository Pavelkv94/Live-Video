import React, { useEffect, useState } from "react";
import "./AdminUsers.scss";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser, editAsAdminUser, fetchAllUsers, resendActivationMail } from "../../../redux/usersReducer";
import { Button, Table } from "antd";
import { dateConvert } from "../../../utils/dateConvert";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { initialAdminUserItems, initialRegData } from "../../general/initialData";
import RegistrationModal from "../../Login/RegistrationModal";
import { DeleteModal } from "../../general/DeleteModal";
import Blocked from "../../general/Blocked";

const AdminUsers = ({ t }) => {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.usersReducer.usersList);
    const user = useSelector((state) => state.authReducer.user);

    const [isUsereModalVisible, setIsUserModalVisible] = useState(false);
    const [userData, setUserData] = useState(initialRegData);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [checkedUser, setCheckedUser] = useState(null);
    const [userModalMode, setUserModalMode] = useState("create");

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleCreateCancel = () => {
        setIsUserModalVisible(false);
        setUserData(initialRegData);
    };

    const handleCreateUser = () => {
        dispatch(createUser(userData));
        handleCreateCancel();
    };

    const handleEditUser = () => {
        dispatch(editAsAdminUser(checkedUser.user_id, userData));
        handleCreateCancel();
    };

    const handleSubmitDeleteModal = () => {
        dispatch(deleteUser(checkedUser.user_id));
        setCheckedUser(null);
        setOpenDeleteModal(false);
    };

    const handleEditMode = (params) => {
        setUserData({
            user_name: params.user_name,
            user_mail: params.user_mail,
            user_info: params.user_info,
            prefered_map: params.prefered_map,
            user_phone: params.user_phone,
            user_uradress: params.user_uradress,
            user_postadress: params.user_postadress,
            user_fiz_ur: params.user_fiz_ur,
            user_ynp: params.user_ynp,
            user_bank: params.user_bank,
            user_rschet: params.user_rschet
        });
        setCheckedUser(params);

        setUserModalMode("edit");
        setIsUserModalVisible(true);
    };
    const columnsUsers = [
        {
            title: t("common.name"),
            dataIndex: "user_name",
            key: "user_name"
        },
        {
            title: t("common.email"),
            dataIndex: "user_mail",
            key: "user_mail"
        },
        {
            title: t("common.phone"),
            dataIndex: "user_phone",
            key: "user_phone"
        },
        {
            title: t("common.registered"),
            dataIndex: "user_regtime",
            key: "user_regtime",
            render: (text, params) => dateConvert(params.user_regtime)
        },
        {
            title: t("common.actions"),
            dataIndex: "actions",
            key: "actions",
            width: 2,
            render: (text, params) => (
                <div className="actions">
                    <Button onClick={() => handleEditMode(params)} icon={<EditOutlined />} />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => {
                            setOpenDeleteModal(true);
                            setCheckedUser(params);
                        }}
                    />
                    <Button type="primary" onClick={() => {}}>
                        {t("admin.connect")}
                    </Button>
                    <Button style={{ background: "#5cb85c", width: 120 }} type="primary" onClick={() => {}}>
                        {t("admin.refillBalance")}
                    </Button>
                </div>
            )
        }
    ];

    const data = users.map((el) => ({ ...el, key: el.user_id }));

    const userItem = (user) =>
        initialAdminUserItems.map((el, i) => (
            <div key={i} className="admin-users-item">
                <span>{t(`admin.${el}`)}:</span>
                <span>
                    {el === "user_mail_verif" ? (
                        user[el] ? (
                            <CheckCircleOutlined style={{ color: "#0b8235" }} />
                        ) : (
                            <CloseCircleOutlined style={{ color: "#f81d22" }} />
                        )
                    ) : el === "user_regtime" ? (
                        dateConvert(user[el])
                    ) : el === "user_fiz_ur" ? (
                        t(user[el] ? "admin.entinity" : "admin.individual")
                    ) : (
                        user[el] || "N/A"
                    )}
                </span>
            </div>
        ));

    if (!user?.admin_name) {
        return <Blocked status="403" title={t("common.accessDenied")} message={t("common.haventAccess")} />;
    }

    return (
        <div className="admin-users">
            <section className="head-section">
                <h2>{t("admin.usersManagement")}</h2>
                <Button
                    shape="circle"
                    icon={<UserAddOutlined />}
                    onClick={() => {
                        setIsUserModalVisible(true);
                        setUserModalMode("create");
                    }}
                />
            </section>
            <Table
                pagination={false}
                columns={columnsUsers}
                dataSource={data}
                expandable={{
                    expandedRowRender: (record) => (
                        <div className="admin-users-info-wrap">
                            <div className="admin-users-info">{userItem(record)}</div>
                            <div className="admin-users-actions">
                                <Button onClick={() => dispatch(resendActivationMail(record.user_mail))}>{t("admin.resendEmail")}</Button>
                                <Button type="primary">{t("admin.selectUser")}</Button>
                                <Button type="default" disabled={record.user_mail_verif}>
                                    {t("admin.activateUser")}
                                </Button>
                                <Button type="default" danger disabled={!record.user_mail_verif}>
                                    {t("admin.deactivateUser")}
                                </Button>
                            </div>
                        </div>
                    )
                }}
            />

            {isUsereModalVisible && (
                <RegistrationModal
                    t={t}
                    open={isUsereModalVisible}
                    handleCancel={handleCreateCancel}
                    handleSubmit={userModalMode === "edit" ? handleEditUser : handleCreateUser}
                    mode={userModalMode}
                    item={userData}
                    setItem={setUserData}
                />
            )}

            {openDeleteModal && (
                <DeleteModal isModalVisible={openDeleteModal} setIsModalVisible={setOpenDeleteModal} submitModal={handleSubmitDeleteModal} item="user" t={t} />
            )}
        </div>
    );
};

export default React.memo(AdminUsers);
