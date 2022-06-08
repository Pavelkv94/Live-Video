import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Spin } from "antd";
import "antd/dist/antd.css";
import { Navigate } from "react-router";
import { HeaderNavBar } from "../HeaderNavBar/HeaderNavBar";
import { MenuBar } from "../MenuBar/MenuBar";

const { Header, Content, Sider } = Layout;
const CamerasList = React.lazy(() => import('../CamerasList/CamersList'));
const CamerasDetails = React.lazy(() => import('../CamerasDetails/CamerasDetails'));
const StoragesList = React.lazy(() => import('../StoragesList/StoragesList'));


export const Main = ({ mode }) => {
    const [collapsed, setCollapse] = useState(false);
    const user = useSelector((state) => state.authReducer.user);

    const currentWindow = (mode) => {
        switch (mode) {
            case "cameras":
                return <Suspense fallback={<Spin size="large"/>}><CamerasList /></Suspense>;;
            case "camerasDetails":
                return <Suspense fallback={<Spin size="large"/>}><CamerasDetails /></Suspense>;;
            case "storages":
                return <Suspense fallback={<Spin size="large"/>}><StoragesList /></Suspense>;

            default:
                return <Suspense fallback={<Spin size="large"/>}><CamerasList /></Suspense>;;
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
