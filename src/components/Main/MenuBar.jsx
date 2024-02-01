import React from "react";
import { Menu } from "antd";
import {
    AimOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    BellOutlined,
    ContainerOutlined,
    DatabaseOutlined,
    DollarOutlined,
    ExceptionOutlined,
    MessageOutlined,
    NodeIndexOutlined,
    ScheduleOutlined,
    TeamOutlined,
    UngroupOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { useSelector } from "react-redux";
import NotificationIndicator from "../Notifications/NotificationIndicator";

export const MenuBar = React.memo(({ t, collapsed }) => {
    const location = useLocation();

    const notifications = useSelector((state) => state.notificationsReducer.notificationsList);
    // const userFromLS = JSON.parse(localStorage.getItem("user"));
    const user = useSelector(state => state.authReducer.user);
    const connected_user = useSelector(state => state.authReducer.connectedUser);

    const unreadNotifs = notifications.filter((el) => !el.viewed_at).length;

    const subMenuCamerasItems = [
        {
            icon: <VideoCameraOutlined />,
            label: t("cameras"),
            path: "/cameras"
        },
        {
            icon: <DatabaseOutlined />,
            label: t("storages"),
            path: "/storages"
        },
        {
            icon: <ScheduleOutlined />,
            label: t("schedules"),
            path: "/schedules"
        },
        {
            icon: <ExceptionOutlined />,
            label: t("reports"),
            path: "/camReports"
        }
    ];

    const subMenuMyAccountItems = [
        {
            icon: <UserOutlined />,
            label: t("profile"),
            path: "/profile"
        },
        {
            icon: <BarChartOutlined />,
            label: t("balance"),
            path: "/balance"
        },
        {
            icon: <DollarOutlined />,
            label: t("payments"),
            path: "/prolongation"
        }
    ];

    const subMenuTrackersItems = [
        {
            icon: <AimOutlined />,
            label: t("trackers"),
            path: "/trackers"
        },
        {
            icon: <NodeIndexOutlined />,
            label: t("routes"),
            path: "/routes"
        },
        {
            icon: <ExceptionOutlined />,
            label: t("reports"),
            path: "/trReports"
        }
    ];

    const subMenuAdminItems = [
        {
            icon: <TeamOutlined />,
            label: t("users"),
            path: "/adminUsers"
        },
        {
            icon: <UserOutlined />,
            label: t("profile"),
            path: "/adminProfile"
        },
        {
            icon: <ContainerOutlined />,
            label: t("trackers_tariffs"),
            path: "/adminTariffsTrackers"
        },
        {
            icon: <ContainerOutlined />,
            label: t("cameras_tariffs"),
            path: "/adminTariffsCameras"
        },
        {
            icon: <BellOutlined />,
            label: t("notifications"),
            path: "/adminNotifications"
        },
        {
            icon: <UngroupOutlined />,
            label: t("equipments"),
            path: "/adminEquipments"
        }
    ];

    const menuItems = [
        {
            icon: <TeamOutlined />,
            label: t("admin"),
            subItems: subMenuAdminItems,
            key: "admin"
        },
        {
            icon: <AppstoreOutlined />,
            label: t("monitoring_objects"),
            path: "/monitoring",
            subItems: null
        },
        {
            icon: <VideoCameraOutlined />,
            label: t("online_cameras"),
            subItems: subMenuCamerasItems
        },
        {
            icon: <AimOutlined />,
            label: t("tracker_management"),
            subItems: subMenuTrackersItems
        },
        {
            icon: <UserOutlined />,
            label: t("my_account"),
            subItems: user?.admin && connected_user ? subMenuMyAccountItems.slice(1)  : subMenuMyAccountItems
        },
        {
            icon: <ContainerOutlined />,
            label: t("tariffs"),
            path: "/tariffs",
            subItems: null
        },
        {
            icon: <MessageOutlined />,
            label: t("feedback"),
            path: "/feedback",
            subItems: null
        },
        {
            icon:
                unreadNotifs > 0 && collapsed ? (
                    <div className="icon-container">
                        <BellOutlined />
                        <div className="circle"></div>
                    </div>
                ) : (
                    <BellOutlined />
                ),
            label: t("notifications"),
            path: "/notifications",
            subItems: null
        }
       
    ];

    const currentMenuItems = user?.admin && connected_user ? menuItems : user?.admin && !connected_user ? menuItems.slice(0,1) :  menuItems.slice(1);

    const getActiveKey = () => {
        const keys = [
            "/cameras",
            "/storages",
            "/schedules",
            "/profile",
            "/balance",
            "/camReports",
            "/monitoring",
            "/trackers",
            "/trReports",
            "/routes",
            "/notifications",
            "/feedback",
            "/tariffs",
            "/adminUsers",
            "/adminTariffsTrackers",
            "/adminTariffsCameras",
            "/adminNotifications",
            "/adminEquipments",
            "/adminProfile",
            "/prolongation"
        ];
        return keys.filter((el) => location.pathname.includes(el));
    };

    return (
        <Menu
            selectedKeys={getActiveKey()}
            mode="inline"
            theme="dark"
            style={{
                height: "100%",
                borderRight: 0
            }}
        >
            {currentMenuItems.map((el) =>
                el.subItems ? (
                    <SubMenu key={el.label} icon={el.icon} title={el.label}>
                        {el.subItems.map((item) => (
                            <Menu.Item icon={item.icon} key={item.path}>
                                <NavLink to={item.path}> {item.label}</NavLink>
                            </Menu.Item>
                        ))}
                    </SubMenu>
                ) : (
                    <Menu.Item icon={el.icon} key={el.path}>
                        <div className="nav-flex">
                            <NavLink to={el.path}>{el.label}</NavLink>
                            {el.path === "/notifications" && unreadNotifs > 0 && <NotificationIndicator items={unreadNotifs} />}
                        </div>
                    </Menu.Item>
                )
            )}
        </Menu>
    );
});
