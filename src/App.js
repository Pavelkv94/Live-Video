import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { useDispatch } from "react-redux";
import { fetchAllUsers, setCurrentUser } from "./redux/authReducer";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('user')))) ;
    }, []);

    return (
        <div>
            <Routes>
                <Route element={<Login />} path="/login" />
                <Route element={<Main />} path="*" />
            </Routes>
        </div>
    );
}

export default App;
