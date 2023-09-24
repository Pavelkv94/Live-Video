import React, { useEffect, useState } from "react";
import "./AdminTariffs.scss";
import { useDispatch, useSelector } from "react-redux";
import Blocked from "../../general/Blocked";
import { Tabs } from "antd";
import AdminTariffsListTab from "./AdminTariffsListTab/AdminTariffsListTab";
import AdminCreateTariffTab from "./AdminCreateTariffTab/AdminCreateTariffTab";
import { fetchAllUsers } from "../../../redux/usersReducer";

const AdminTariffs = ({ t }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.authReducer.user);

    const [tab, setTab] = useState("1");

    const onChangeTab = (key) => {
        setTab(key);
    };

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const items = [
        {
            key: "1",
            label: t("admin.tariffsList"),
            children: <AdminTariffsListTab setTab={onChangeTab} t={t} />
        },
        {
            key: "2",
            label: t("admin.createNewTariff"),
            children: <AdminCreateTariffTab t={t} />
        }
    ];

    if (!user?.admin_name) {
        return <Blocked status="403" title={t("common.accessDenied")} message={t("common.haventAccess")} />;
    }

    return (
        <div className="tariffs">
            <section className="head-section">
                <h2>{t("admin.tariffsManagement")}</h2>
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
        </div>
    );
};

export default React.memo(AdminTariffs);
