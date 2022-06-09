import { PageHeader, Tabs, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCamera } from "../../redux/camerasReducer";
import "./CamerasDetails.css";
import { History } from "./History/History";
import { LiveTab } from "./LiveTab/LiveTab";
const { TabPane } = Tabs;

const CamerasDetails = React.memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentCamera = useSelector(
        (state) => state.camerasReducer.currentCamera
    );
    const deleteCameraStatus = useSelector(state => state.camerasReducer.deleteCameraStatus);

    useEffect(() => {
        dispatch(fetchCamera(id));
    }, []);

    useEffect(() => {
        if(deleteCameraStatus === 'fulfilled') {window.history.back()}
    }, [deleteCameraStatus]);

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={currentCamera.name}
                tags={<Tag color={currentCamera.status === 'recording' ? "green" : "red" }>{currentCamera.status ? currentCamera.status : 'disabled'}</Tag>}
            />
            <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Live" key="1">
                    <LiveTab currentCamera={currentCamera}/>
                </TabPane>
                <TabPane tab="History" key="2">
                    <History id={id}/>
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    );
});

export default CamerasDetails;
