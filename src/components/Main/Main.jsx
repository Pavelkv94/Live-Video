import React, { useState } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { Navigate } from "react-router";
import { HeaderNavBar } from "../HeaderNavBar/HeaderNavBar";
import { MenuBar } from "../MenuBar/MenuBar";
import { CamerasList } from "../CamerasList/CamersList";
import { CamerasDetails } from "../CamerasDetails/CamerasDetails";
import { useSelector } from "react-redux";
import { StoragesList } from "../StoragesList/StoragesList";
const { Header, Content, Sider } = Layout;

export const Main = ({ mode }) => {
    const [collapsed, setCollapse] = useState(false);
    const user = useSelector((state) => state.authReducer.user);

    const currentWindow = (mode) => {
        switch (mode) {
            case "cameras":
                return <CamerasList />;
            case "camerasDetails":
                return <CamerasDetails />;
            case "storages":
                return <StoragesList />;

            default:
                return <CamerasList />;
        }
    };

    if (!user) {
        return <Navigate to={"/login"} />;
    } else
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
                        <MenuBar mode={mode} />
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
                            {currentWindow(mode)}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
};
