import { Layout } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { HeaderNavBar } from "./components/HeaderNavBar/HeaderNavBar";
const { Header, Content, Sider } = Layout;

function App() {
    const [collapsed, setCollapse] = useState(false);

    return (
        <Layout>
            <Header>
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
                <Layout>
                    <Content
                        className="site-layout-background"
                        style={{
                          padding: 24,
                          margin: 0,
                          minHeight: 280,
                        }}
                    >
                        <Routes>
                            {/* <Route exact path="/main/:id?" render={() => <MainWindow />} /> */}
                            {/* <Route exact path="/admin" render={() => <Admin />} /> */}
                            <Route element={<Login />} path="/login" />
                            <Route element={<Main />} path="/" />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default App;
