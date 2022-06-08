import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCamera } from "../../../redux/camerasReducer";
import "./LiveTab.css";

export const LiveTab = ({id, currentCamera}) => {

    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(fetchCamera(id));
    }, []);

    const paramsData = [
        { title: "Ip: ", value: currentCamera.ip || "—" },
        { title: "Device Name: ", value: currentCamera.deviceName || "—" },
        { title: "MAC Address: ", value: currentCamera.macAddress || "—" },
        { title: "Model: ", value: currentCamera.model || "—" },
        { title: "Login: ", value: currentCamera.login || "—" },
        { title: "Password: ", value: currentCamera.password || "—" },
        { title: "Serial Number: ", value: currentCamera.serialNumber || "—" },
        { title: "Status: ", value: currentCamera.status || "—" },
        { title: "Created: ", value: currentCamera.created_at || "—" },
        { title: "Updated: ", value: currentCamera.updated_at || "—" },
        { title: "User: ", value: currentCamera.user_id || "—" },
        { title: "Bucket: ", value: currentCamera.bucket_id || "—" },
    ];

    const params = paramsData.map((el, index) => (
        <span key={index} className="params-row">
            <p>{el.title}</p>
            <p>{el.value}</p>
        </span>
    ));
    return (
        <div className="camera-details">
            <section></section>
            <section>{params}</section>
        </div>
    );
};
