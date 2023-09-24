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

    const unreadNotifs = notifications.filter((el) => !el.viewed_at).length;

    const subMenuCamerasItems = [
        {
            icon: <VideoCameraOutlined />,
            label: t("menuBar.cameras"),
            path: "/cameras"
        },
        {
            icon: <DatabaseOutlined />,
            label: t("menuBar.storages"),
            path: "/storages"
        },
        {
            icon: <ScheduleOutlined />,
            label: t("menuBar.schedules"),
            path: "/schedules"
        },
        {
            icon: <ExceptionOutlined />,
            label: t("menuBar.reports"),
            path: "/camerasReports"
        }
    ];

    const subMenuMyAccountItems = [
        {
            icon: <UserOutlined />,
            label: t("menuBar.profile"),
            path: "/profile"
        },
        {
            icon: <BarChartOutlined />,
            label: t("menuBar.balance"),
            path: "/balance"
        },
        {
            icon: <DollarOutlined />,
            label: t("menuBar.payments"),
            path: "/prolongation"
        }
    ];

    const subMenuTrackersItems = [
        {
            icon: <AimOutlined />,
            label: t("menuBar.trackers"),
            path: "/trackers"
        },
        {
            icon: <NodeIndexOutlined />,
            label: t("menuBar.routes"),
            path: "/routes"
        },
        {
            icon: <ExceptionOutlined />,
            label: t("menuBar.reports"),
            path: "/trReports"
        }
    ];

    const subMenuAdminItems = [
        {
            icon: <TeamOutlined />,
            label: t("admin.users"),
            path: "/adminUsers"
        },
        {
            icon: <ContainerOutlined />,
            label: t("admin.tariffs"),
            path: "/adminTariffs"
        },
        {
            icon: <BellOutlined />,
            label: t("admin.notifications"),
            path: "/adminNotifications"
        },
        {
            icon: <UngroupOutlined />,
            label: t("admin.equipments"),
            path: "/adminEquipments"
        }
    ];

    const menuItems = [
        {
            icon: <AppstoreOutlined />,
            label: t("menuBar.monitoringObjects"),
            path: "/monitoring",
            subItems: null
        },
        {
            icon: <VideoCameraOutlined />,
            label: t("menuBar.onlineCameras"),
            subItems: subMenuCamerasItems
        },
        {
            icon: <AimOutlined />,
            label: t("menuBar.trackerManagement"),
            subItems: subMenuTrackersItems
        },
        {
            icon: <UserOutlined />,
            label: t("menuBar.myAccount"),
            subItems: subMenuMyAccountItems
        },
        {
            icon: <ContainerOutlined />,
            label: t("menuBar.tariffs"),
            path: "/tariffs",
            subItems: null
        },
        {
            icon: <MessageOutlined />,
            label: t("menuBar.feedback"),
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
            label: t("menuBar.notifications"),
            path: "/notifications",
            subItems: null
        },
        {
            icon: <TeamOutlined />,
            label: t("menuBar.admin"),
            subItems: subMenuAdminItems
        }
    ];

    // const currentMenuItems = user?.admin_name ? menuItems : menuItems.slice(0, -1);

    const getActiveKey = () => {
        const keys = [
            "/cameras",
            "/storages",
            "/schedules",
            "/profile",
            "/balance",
            "/camerasReports",
            "/monitoring",
            "/trackers",
            "/trReports",
            "/routes",
            "/notifications",
            "/feedback",
            "/tariffs",
            "/adminUsers",
            "/adminTariffs",
            "/adminNotifications",
            "/adminEquipments",
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
            {menuItems.map((el) =>
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
