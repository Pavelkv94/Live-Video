import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { useDispatch, useSelector } from "react-redux";
import { initializedApp } from "./redux/authReducer";
import { Spin } from "antd";

function App() {
    const dispatch = useDispatch();
    const initStatus = useSelector(
        (state) => state.authReducer.initializedStatus
    );

    useEffect(() => {
        dispatch(initializedApp());
    }, []);

    const displayMode = {
        cameras: "cameras",
        camerasDetails: "camerasDetails",
        storages: "storages",
        schedules: "schedules"
    };

    if (initStatus !== "complete") {
        return <Spin />;
    } else
        return (
            <div>
                <Routes>
                    <Route
                        element={<Main mode={displayMode.cameras} />}
                        path="/"
                    />
                    <Route element={<Login />} path="/login" />
                    <Route
                        element={<Main mode={displayMode.cameras} />}
                        path="/cameras"
                    />
                    <Route
                        element={<Main mode={displayMode.camerasDetails} />}
                        path="cameras/details/:id"
                    />
                    <Route
                        element={<Main mode={displayMode.storages} />}
                        path="/storages"
                    />
                     <Route
                        element={<Main mode={displayMode.schedules} />}
                        path="/schedules"
                    />
                </Routes>
            </div>
        );
}

export default App;
