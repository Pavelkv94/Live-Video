import { PageHeader, Tabs, Tag } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCamera } from "../../redux/camerasReducer";
import { CameraSchedules } from "./CameraSchedules/CameraSchedules";
import "./CameraDetails.css";
import { History } from "./History/History";
import { LiveTab } from "./LiveTab/LiveTab";
const { TabPane } = Tabs;

const CameraDetails = React.memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentCamera = useSelector(
        (state) => state.camerasReducer.currentCamera
    );
    const deleteCameraStatus = useSelector(state => state.camerasReducer.deleteCameraStatus);

    const [tab, setTab] = useState('1');

    useEffect(() => {
        dispatch(fetchCamera(id));
    }, []);

    useEffect(() => {
        if(deleteCameraStatus === 'fulfilled') {window.history.back()}
    }, [deleteCameraStatus]);

    const onChangeTab = (key) => {
        setTab(key)
    };

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={currentCamera.name}
            />
            <Tabs defaultActiveKey="1" onChange={onChangeTab} activeKey={tab}>
                <TabPane tab="Live" key="1">
                    <LiveTab currentCamera={currentCamera} setTab={onChangeTab}/>
                </TabPane>
                <TabPane tab="Camera Schedules" key="2">
                    <CameraSchedules/>
                </TabPane>
                <TabPane tab="History" key="3">
                    <History/>
                </TabPane>
            </Tabs>
        </div>
    );
});

export default CameraDetails;
