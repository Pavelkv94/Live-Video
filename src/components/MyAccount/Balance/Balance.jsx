import React, { useEffect, useState } from "react";

import "./Balance.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalanceOperations, refillBalanceFromAdmin, rollBackOperationFromAdmin } from "../../../redux/balanceReducer";
import { Button, Divider, Input, Table } from "antd";
import { dateConvert } from "../../../utils/dateConvert";
import { fetchCamerasTariffs, fetchTrackersTariffs } from "../../../redux/tariffsReducer";
import { Link } from "react-router-dom";
import { fetchTrackers } from "../../../redux/trackersReducer";
import RefillBalanceModal from "../../general/RefillBalanceModal";

const Balance = ({ t, isMobileSize }) => {
    const dispatch = useDispatch();
    const balanceOperations = useSelector((state) => state.balanceReducer.balanceOperations);
    const trackerTariffs = useSelector((state) => state.tariffsReducer.trackersTariffsList);
    const cameraTariffs = useSelector((state) => state.tariffsReducer.camerasTariffsList);
    const user = useSelector((state) => state.authReducer.user);
    const trackers = useSelector((state) => state.trackersReducer.trackersList);
    const [openRefillModal, setOpenRefillModal] = useState(false);
    const [refillAmount, setRefillAmount] = useState(0);
    const connectedUser = useSelector((state) => state.authReducer.connectedUser);

    const handleSubmitRefillModal = () => {
        dispatch(refillBalanceFromAdmin(connectedUser.id, refillAmount, "fromBalance"));
        setOpenRefillModal(false);
    };

    const handleCloseRefillModal = () => {
        setRefillAmount(0);
        setOpenRefillModal(false);
    };

    useEffect(() => {
        dispatch(fetchBalanceOperations());
        dispatch(fetchTrackersTariffs());
        dispatch(fetchCamerasTariffs());
        dispatch(fetchTrackers(user.id));
    }, [dispatch]);

    const columns = [
        {
            title: t("operation_date"),
            dataIndex: "created_at",
            key: "created_at",
            align: "center",
            render: (text) => <div>{dateConvert(text)}</div>
        },
        {
            title: t("type"),
            dataIndex: "operation_type",
            key: "operation_type",
            align: "center",
            render: (text) => (text === 2 ? t("withdrawals") : t("receipt"))
        },
        {
            title: t("sum"),
            dataIndex: "amount",
            key: "amount",
            align: "center"
        },
        {
            title: t("balance"),
            dataIndex: "balance",
            key: "balance",
            align: "center"
        },
        {
            title: t("operation_for"),
            dataIndex: "item_type",
            key: "item_type",
            align: "center",
            render: (text) => text || "—"
        },
        {
            title: t("init_object_name"),
            dataIndex: "item_name",
            key: "item_name",
            align: "center",
            render: (text) => text || "—"
        },
        {
            title: t("current_object_name"),
            dataIndex: "item_id",
            key: "item_id",
            align: "center",
            render: (text) => trackers.find((el) => el.id === text)?.name || "—"
        },
        {
            title: t("tariff"),
            dataIndex: "item_tariff_id",
            key: "item_tariff_id",
            align: "center",
            render: (text, params) => {
                const isCameraTariff = params.item_type === "Camera";
                const tariffs = isCameraTariff ? cameraTariffs : trackerTariffs;
                return tariffs.find((el) => text === el.id)?.name ? <Link to="/tariffs">{tariffs.find((el) => text === el.id)?.name}</Link> : "—";
            }
        },
        {
            title: t("start_date"),
            dataIndex: "start_date",
            key: "start_date",
            align: "center",
            render: (text) => <div>{text === null ? "—" : dateConvert(text)}</div>
        },
        {
            title: t("end_date"),
            dataIndex: "end_date",
            key: "end_date",
            align: "center",
            render: (text) => <div>{text === null ? "—" : dateConvert(text)}</div>
        }
    ];

    const rollBackOperation = (payment_id) => () => {
        dispatch(rollBackOperationFromAdmin(payment_id));
    };

    const columnsFromAdmin = [
        ...columns,
        {
            title: "",
            dataIndex: "cancel",
            key: "cancel",
            align: "left",
            render: (text, params) =>
                params.id === balanceOperations.payments[0].id && (
                    <Button onClick={rollBackOperation(params.id)}>{t("cancel")}</Button>
                )
        }
    ];

    const data = balanceOperations.payments?.map((el) => ({ ...el, key: el.id }));

    return (
        <div className="balance-operations">
            <section className="head-section">
                <h2>{t("balance")}</h2>
            </section>
            <section className="balance-operations-content">
                <div className="balance">
                    <h3>{t("your_virtual_balance")}</h3>
                    <Input disabled value={`${balanceOperations.user_balance} BYN`} />
                    {user?.admin && (
                        <Button onClick={() => setOpenRefillModal(true)} style={{ marginLeft: "10px", background: "#5cb85c", width: 120 }} type="primary">
                            {t("refill_balance")}
                        </Button>
                    )}
                </div>
                <Divider />
                <Table columns={user?.admin ? columnsFromAdmin : columns} dataSource={data} pagination={false} size={isMobileSize ? "small" : "middle"} />
            </section>
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

export default React.memo(Balance);
