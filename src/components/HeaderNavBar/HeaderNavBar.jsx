import { LogoutOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

export const HeaderNavBar = React.memo(() => {


    return (
        <div>
               <Button  key={1}
                    style={{ position: "absolute", right: "10px" }}
                   
                >
                    <LogoutOutlined style={{marginRight: '10px'}} />LOGOUT
                </Button>
        </div>
    );
});