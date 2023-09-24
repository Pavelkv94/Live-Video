import React, { useEffect } from "react";

import "./Balance.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalanceOperations } from "../../../redux/balanceReducer";
import { Divider, Input, Table } from "antd";
import { dateConvert } from "../../../utils/dateConvert";
import { fetchTariffs } from "../../../redux/tariffsReducer";
import { Link } from "react-router-dom";

const Balance = ({ t }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const balanceOperations = useSelector((state) => state.balanceReducer.balanceOperations);
    const tariffs = useSelector((state) => state.tariffsReducer.tariffsList);

    useEffect(() => {
        dispatch(fetchBalanceOperations(user.user_id));
        dispatch(fetchTariffs());
    }, [dispatch]);

    const columns = [
        {
            title: t("myAccount.operationDate"),
            dataIndex: "balanceoperation_dateoperation",
            key: "balanceoperation_dateoperation",
            align: "center",
            render: (text) => <div>{dateConvert(text)}</div>
        },
        {
            title: t("myAccount.type"),
            dataIndex: "balanceoperation_type_P_M",
            key: "balanceoperation_type_P_M",
            align: "center",
            render: (text) => text === 2 ? t("myAccount.withdrawals") : t("myAccount.receipt")
        },
        {
            title: t("myAccount.sum"),
            dataIndex: "balanceoperation_sum",
            key: "balanceoperation_sum",
            align: "center"
        },
        {
            title: t("myAccount.balance"),
            dataIndex: "balanceoperation_balance",
            key: "balanceoperation_balance",
            align: "center"
        },
        {
            title: t("myAccount.operationFor"),
            dataIndex: "balanceoperation_object_type",
            key: "balanceoperation_object_type",
            align: "center"
        },
        {
            title: t("myAccount.objectName"),
            dataIndex: "balanceoperation_object_name",
            key: "balanceoperation_object_name",
            align: "center"
        },
        {
            title: t("myAccount.initObjectName"),
            dataIndex: "balanceoperation_dateoperation",
            key: "balanceoperation_dateoperation",
            align: "center",
            render: () => <div>имя на момент операции</div>

        },
        {
            title: t("myAccount.tariff"),
            dataIndex: "balanceoperation_ref_tariffobj",
            key: "balanceoperation_ref_tariffobj",
            align: "center",
            render: (text) => <Link to="/tariffs">{tariffs.find((el) => text === el.tariffobj_id)?.tariffobj_name || "—"}</Link>

        },
        {
            title: t("myAccount.startDate"),
            dataIndex: "balanceoperation_date_start",
            key: "balanceoperation_date_start",
            align: "center",
            render: (text) => <div>{dateConvert(text)}</div>
        },
        {
            title: t("myAccount.endDate"),
            dataIndex: "balanceoperation_date_finish",
            key: "balanceoperation_date_finish",
            align: "center",
            render: (text) => <div>{dateConvert(text)}</div>
        }
    ];

    const data = balanceOperations.balance_operations?.filter((el) => !el.shared).map((el) => ({ ...el, key: el.balanceoperation_id }));

    return (
        <div className="balance-operations">
            <section className="head-section">
                <h2>{t("menuBar.balance")}</h2>
            </section>
            <section className="balance-operations-content">
                <div className="balance">
                    <h3>{t("myAccount.yourVirtualBalance")}</h3>
                    <Input disabled value={`${balanceOperations.user_balance} BYN`} />
                </div>
                <Divider />
                <Table columns={columns} dataSource={data} pagination={false} />
            </section>
        </div>
    );
};

export default React.memo(Balance);
