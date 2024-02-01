import React, { useEffect, useState } from "react";
import "./AdminTariffsCameras.scss";
import { useDispatch, useSelector } from "react-redux";
import Blocked from "../../general/Blocked";
import { Tabs } from "antd";
import AdminTariffsCamerasListTab from "./AdminTariffsCamerasListTab/AdminTariffsCamerasListTab";
import AdminCreateTariffCamerasTab from "./AdminCreateTariffCamerasTab/AdminCreateTariffCamerasTab";
import { fetchAllUsers } from "../../../redux/usersReducer";

const AdminTariffsCameras = ({ t }) => {
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
            label: t("tariffs_list"),
            children: <AdminTariffsCamerasListTab setTab={onChangeTab} t={t} />
        },
        {
            key: "2",
            label: t("create_new_tariff"),
            children: <AdminCreateTariffCamerasTab t={t} />
        }
    ];

    if (!user?.admin) {
        return <Blocked status="403" title={t("access_denied")} message={t("havent_access")} />;
    }

    return (
        <div className="tariffs">
            <section className="head-section">
                <h2>{t("tariffs_cameras_management")}</h2>
            </section>
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab} items={items} />
        </div>
    );
};

export default React.memo(AdminTariffsCameras);
