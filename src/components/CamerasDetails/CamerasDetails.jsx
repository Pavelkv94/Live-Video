import { PageHeader, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCamera } from "../../redux/camerasReducer";
import "./CamerasDetails.css";

export const CamerasDetails = React.memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const currentCamera = useSelector(
        (state) => state.camerasReducer.currentCamera
    );

    useEffect(() => {
        dispatch(fetchCamera(id));
    }, []);

    const params = [
        {title: "Ip:", value: currentCamera.ip || "—"},
        {title: "Device Name:", value: currentCamera.deviceName || "—"},
        {title: "MAC Address:", value: currentCamera.macAddress || "—"},
        {title: "Model:", value: currentCamera.model || "—"},
        {title: "Login:", value: currentCamera.login || "—"},
        {title: "Password:", value: currentCamera.password || "—"},
        {title: "Serial Number:", value: currentCamera.serialNumber || "—"},
        {title: "Status:", value: currentCamera.status || "—"},
        {title: "Created", value: currentCamera.created_at || "—"},
        {title: "Updated:", value: currentCamera.updated_at || "—"},
        {title: "User:", value: currentCamera.user_id || "—"},
        {title: "Bucket:", value: currentCamera.bucket_id || "—"}
    ];

    const columns = [
        {
            title: "",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "",
            dataIndex: "value",
            key: "value",
        },
    ];

    const data = params.map((el, index) => ({
        key: index,
        title: el.title,
        value: el.value
    }))

    
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
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered
                        showHeader={false}
                    />
                   
                </section>
            </div>
        </div>
    );
});
