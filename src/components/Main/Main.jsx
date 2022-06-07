import React, { useState } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import { HeaderNavBar } from "../HeaderNavBar/HeaderNavBar";
import { MenuBar } from "../MenuBar/MenuBar";
import { CamerasList } from "../CamerasList/CamersList";
import { CamerasDetails } from "../CamerasDetails/CamerasDetails";
const { Header, Content, Sider } = Layout;

export const Main = ({mode}) => {
    const [collapsed, setCollapse] = useState(false);
    return (
        <Layout>
            <Header className="header">
                <HeaderNavBar />
            </Header>
            <Layout>
                <Sider
                    width={200}
                    className="site-layout-background"
                    collapsed={collapsed}
                    collapsible
                    onCollapse={() => setCollapse(!collapsed)}
                >
                    <MenuBar />
                </Sider>
                <Layout
                    style={{
                        padding: "24px",
                        minHeight: "100%",
                    }}
                >
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            height: "calc(100vh - 112px)",
                        }}
                    >
                        {mode == 'cameras' ? <CamerasList /> : <CamerasDetails />}

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
