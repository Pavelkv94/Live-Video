import React from "react";
import { Menu } from "antd";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";

export const MenuBar = React.memo(() => {
    const items1 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
        const key = String(index + 1);
        return {
          key: `sub${key}`,
          icon: React.createElement(icon),
          label: `subnav ${key}`,
         
        };
      });

    return (
        <div>
            <Menu
                items={items1}
                mode="inline"
                theme="dark"
                subMenuCloseDelay={2}
                style={{
                    height: "100%",
                    borderRight: 0,
                }}
            >
               
            </Menu>
        </div>
    );
});
