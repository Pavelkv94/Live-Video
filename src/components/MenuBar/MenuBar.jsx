import React from "react";
import { Menu } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";

export const MenuBar = React.memo(() => {
    const menuItems = [
      {key: '0',
    icon: <VideoCameraOutlined />,
  label: 'Cameras'}
    ];

    return (
            <Menu
            defaultSelectedKeys={['0']}
                items={menuItems}
                mode="inline"
                theme="dark"
                subMenuCloseDelay={2}
                style={{
                    height: "100%",
                    borderRight: 0,
                }}
            >
               
            </Menu>
    );
});
