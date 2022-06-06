import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { setCurrentUser } from "../../redux/authReducer";
import "./HeaderNavBar.css";

export const HeaderNavBar = React.memo(() => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);

    const logout = () => {localStorage.removeItem('user'); dispatch(setCurrentUser(null))};

    if (!user) {
        return <Navigate to={"/login"} />;
    } else
        return (
            <div className="logout">
                <h2>{user.email}</h2>
                <Button key={1} onClick={logout}>
                    <LogoutOutlined style={{ marginRight: "10px" }} />
                    LOGOUT
                </Button>
            </div>
        );
});
