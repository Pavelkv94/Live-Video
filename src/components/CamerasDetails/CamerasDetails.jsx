import { PageHeader, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCamera } from "../../redux/camerasReducer";
import "./CamerasDetails.css";

const CamerasDetails = React.memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const currentCamera = useSelector(
        (state) => state.camerasReducer.currentCamera
    );

    useEffect(() => {
        dispatch(fetchCamera(id));
    }, []);

    const paramsData = [
        {title: "Ip: ", value: currentCamera.ip || "—"},
        {title: "Device Name: ", value: currentCamera.deviceName || "—"},
        {title: "MAC Address: ", value: currentCamera.macAddress || "—"},
        {title: "Model: ", value: currentCamera.model || "—"},
        {title: "Login: ", value: currentCamera.login || "—"},
        {title: "Password: ", value: currentCamera.password || "—"},
        {title: "Serial Number: ", value: currentCamera.serialNumber || "—"},
        {title: "Status: ", value: currentCamera.status || "—"},
        {title: "Created: ", value: currentCamera.created_at || "—"},
        {title: "Updated: ", value: currentCamera.updated_at || "—"},
        {title: "User: ", value: currentCamera.user_id || "—"},
        {title: "Bucket: ", value: currentCamera.bucket_id || "—"}
    ];

    const params = paramsData.map((el, index) => <span key={index} className="params-row"><p>{el.title}</p><p>{el.value}</p></span>)

    
    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={currentCamera.name}
                tags={<Tag color="blue">Running</Tag>}
            />
            <div className="camera-details">
                <section></section>
                <section>
                    {params}
                    {/* <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered
                        showHeader={false}
                    /> */}
                   
                </section>
            </div>
        </div>
    );
});


export default CamerasDetails;