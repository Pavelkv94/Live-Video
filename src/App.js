import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { useDispatch } from "react-redux";
import { fetchAllUsers, setCurrentUser } from "./redux/authReducer";
import { CamerasList } from "./components/CamerasList/CamersList";
import { CamerasDetails } from "./components/CamerasDetails/CamerasDetails";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('user')))) ;
    }, []);

    const displayMode = {
        cameras: 'cameras',
        camerasDetails: 'camerasDetails'
    }
    return (
        <div>
            <Routes>
                <Route exact element={<Login />} path="/login" />
                <Route exact element={<Main mode={displayMode.cameras}/>} path="/cameras" />
                <Route exact element={<Main mode={displayMode.camerasDetails}/>} path="cameras/details/:id" />
            </Routes>
        </div>
    );
}

export default App;
