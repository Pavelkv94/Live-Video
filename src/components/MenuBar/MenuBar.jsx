import React from "react";
import { Menu } from "antd";
import {
    DatabaseOutlined,
    ScheduleOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export const MenuBar = React.memo(({ mode }) => {
    const menuItems = [
        {
            key: "0",
            icon: <VideoCameraOutlined />,
            label: "Cameras",
            path: "/cameras",
        },
        {
            key: "1",
            icon: <DatabaseOutlined />,
            label: "Storages",
            path: "/storages",
        },
        {
            key: "2",
            icon: <ScheduleOutlined />,
            label: "Schedules",
            path: "/schedules",
        },
    ];

    const defaultKey =
        mode === "cameras" || mode === "camerasDetails"
            ? ["0"]
            : mode === "storages"
            ? ["1"]
            : ["2"];
    return (
        <Menu
            defaultSelectedKeys={defaultKey}
            mode="inline"
            theme="dark"
            subMenuCloseDelay={2}
            style={{
                height: "100%",
                borderRight: 0,
            }}
        >
            {menuItems.map((el, index) => (
                <Menu.Item icon={el.icon} key={el.key}>
                    <NavLink to={el.path}> {el.label}</NavLink>
                </Menu.Item>
            ))}
        </Menu>
    );
});
