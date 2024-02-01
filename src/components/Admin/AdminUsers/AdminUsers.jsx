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
import { connectToUser, disconnectFromUser } from "../../../redux/authReducer";
import { refillBalanceFromAdmin } from "../../../redux/balanceReducer";
import RefillBalanceModal from "../../general/RefillBalanceModal";

const AdminUsers = ({ t }) => {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.usersReducer.usersList);
    const user = useSelector((state) => state.authReducer.user);
    const connectedUser = useSelector((state) => state.authReducer.connectedUser);
    // const connectedUser = JSON.parse(localStorage.getItem("selected_user"));

    const [isUsereModalVisible, setIsUserModalVisible] = useState(false);
    const [userData, setUserData] = useState(initialRegData);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openRefillModal, setOpenRefillModal] = useState(false);
    const [checkedUser, setCheckedUser] = useState(null);
    const [userModalMode, setUserModalMode] = useState("create");
    const [refillAmount, setRefillAmount] = useState(0);

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
        dispatch(editAsAdminUser(checkedUser.id, userData));
        handleCreateCancel();
    };

    const handleSubmitDeleteModal = () => {
        dispatch(deleteUser(checkedUser.id));
        setCheckedUser(null);
        setOpenDeleteModal(false);
    };

    const handleSubmitRefillModal = () => {
        dispatch(refillBalanceFromAdmin(checkedUser.id, refillAmount, "fromAdminUsers"));
        setCheckedUser(null);
        setOpenRefillModal(false);
    };

    const handleCloseRefillModal = () => {
        setRefillAmount(0);
        setCheckedUser(null);
        setOpenRefillModal(false);
    };

    const handleEditMode = (params) => {
        setUserData({
            name: params.name,
            second_name: params.second_name,
            email: params.email,
            info: params.info,
            prefered_map: params.prefered_map,
            phone: params.phone,
            legal_adress: params.legal_adress,
            post_adress: params.post_adress,
            business_type: params.business_type,
            unp: params.unp,
            bank_info: params.bank_info,
            bank_account: params.bank_account
        });
        setCheckedUser(params);

        setUserModalMode("edit");
        setIsUserModalVisible(true);
    };

    const columnsUsers = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name"
        },
        {
            title: t("email"),
            dataIndex: "email",
            key: "email"
        },
        {
            title: t("phone"),
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: t("registered"),
            dataIndex: "created_at",
            key: "created_at",
            render: (text, params) => dateConvert(params.created_at)
        },
        {
            title: t("actions"),
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
                    {connectedUser?.id !== params.id ? (
                        <Button type="primary" onClick={() => dispatch(connectToUser({ user_id: params.id }))}>
                            {t("connect")}
                        </Button>
                    ) : (
                        <Button type="primary" danger onClick={() => dispatch(disconnectFromUser())}>
                            {t("disconnect")}
                        </Button>
                    )}
                    <Button style={{ background: "#5cb85c", width: 120 }} type="primary" onClick={() => {setCheckedUser(params);setOpenRefillModal(true);}}>
                        {t("refill_balance")}
                    </Button>
                </div>
            )
        }
    ];

    const data = users.map((el) => ({ ...el, key: el.id }));

    const userItem = (user) =>
        initialAdminUserItems.map((el, i) => (
            <div key={i} className="admin-users-item">
                <span>{t(`${el}`)}:</span>
                <span>
                    {el === "active" ? (
                        user[el] ? (
                            <CheckCircleOutlined style={{ color: "#0b8235" }} />
                        ) : (
                            <CloseCircleOutlined style={{ color: "#f81d22" }} />
                        )
                    ) : el === "created_at" ? (
                        dateConvert(user[el])
                    ) : el === "business_type" ? (
                        t(user[el] ? "entinity" : "individual")
                    ) : (
                        user[el] || "N/A"
                    )}
                </span>
            </div>
        ));

    if (!user?.admin) {
        return <Blocked status="403" title={t("access_denied")} message={t("havent_access")} />;
    }

    return (
        <div className="admin-users">
            <section className="head-section">
                <h2>{t("users_management")}</h2>
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
                                <Button onClick={() => dispatch(resendActivationMail(record.email))}>{t("resend_email")}</Button>
                                {/* <Button type="primary" onClick={() => dispatch(connectToUser({user_id: record.id}))}>{t("select_user")}</Button> */}
                                <Button type="default" disabled={record.active}>
                                    {t("activate_user")}
                                </Button>
                                <Button type="default" danger disabled={!record.active}>
                                    {t("deactivate_user")}
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

            {openRefillModal && (
                <RefillBalanceModal
                    isModalVisible={openRefillModal}
                    t={t}
                    handleSubmit={handleSubmitRefillModal}
                    handleCancel={handleCloseRefillModal}
                    refillAmount={refillAmount}
                    setRefillAmount={setRefillAmount}
                />
            )}
        </div>
    );
};

export default React.memo(AdminUsers);
