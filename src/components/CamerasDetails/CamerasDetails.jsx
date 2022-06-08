import { PageHeader, Tabs, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "./CamerasDetails.css";
import { History } from "./History/History";
import { LiveTab } from "./LiveTab/LiveTab";
const { TabPane } = Tabs;

const CamerasDetails = React.memo(() => {
    const { id } = useParams();
    const currentCamera = useSelector(
        (state) => state.camerasReducer.currentCamera
    );

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={currentCamera.name}
                tags={<Tag color="blue">Running</Tag>}
            />
            <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Live" key="1">
                    <LiveTab id={id} currentCamera={currentCamera}/>
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
