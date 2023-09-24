import React, { useState } from "react";
import "./MonitoringObjectTrackersTab.scss";
import { Button, Checkbox, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { initalTracker, trackerDetails } from "../../../general/initialData";
import AssignTrackerModal from "./AssignTrackerModal";
import TrackerEditModal from "../../../Tracker management/Trackers/TrackerEditModal";
import { changeMonitoringTrackerVisibleAC, createMonitoringObjectTrackers, unassignMonitoringObjectTracker } from "../../../../redux/monitoringObjectsReducer";
import GlobalGoogleMap from "../../../general/GlobalGoogleMap";
import { DisconnectOutlined } from "@ant-design/icons";
import { dateConvert } from "../../../../utils/dateConvert";
import GlobalYandexMap from "../../../general/GlobalYandexMap";
import GlobalOSMap from "../../../general/GlobalOSMap";

const MonitoringObjectTrackersTab = ({ t, isSharedObject }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const monitoringObjectTrackers = useSelector((state) => state.monitoringObjectsReducer.monitoringObjectTrackers);
    // const monitoringObjectTrackers = mockTrackers.slice(1);

    const user = useSelector((state) => state.authReducer.user);
    
    const [openCreateTracker, setOpenCreateTracker] = useState(false);
    const [trackerData, setTrackerData] = useState(initalTracker);
    const [openAssignTracker, setOpenAssignTracker] = useState(false);
    const [expandMap, setExpandMap] = useState(false);

    const handleCancelCreateTracker = () => {
        setOpenCreateTracker(false);
        setTrackerData(initalTracker);
    };

    const handleCreateTracker = () => {
        dispatch(createMonitoringObjectTrackers(id, { ...trackerData, monitoring_object_id: id }));
        handleCancelCreateTracker();
    };

    const handleUnassignTracker = (tracker) => () => {
        dispatch(unassignMonitoringObjectTracker(id, tracker));
    };

    const handleCancelAssignTracker = () => {
        setOpenAssignTracker(false);
        setTrackerData(initalTracker);
    };

    const handleChangeVisible = (tracker_id) => (e) => {
        dispatch(changeMonitoringTrackerVisibleAC(tracker_id, e.target.checked));
    };

    const columns = [
        {
            title: t("common.name"),
            dataIndex: "trobject_name",
            key: "name"
        },
        {
            title: t("common.regDate"),
            dataIndex: "trobject_regtime",
            key: "trobject_regtime",
            render: (text, params) => <p style={{ width: "120px" }}>{dateConvert(params.trobject_regtime)}</p>
        },
        {
            title: t("common.speed"),
            dataIndex: "trobject_speed",
            key: "Speed"
        },
        {
            title: t("common.visible"),
            dataIndex: "visible",
            key: "visible",
            render: (text, params) => (
                <div className="flex">
                    <div className="indicator" style={{ background: params.color }}></div>
                    <Checkbox onChange={handleChangeVisible(params.trobject_id)} checked={params.isVisibleOnMap}></Checkbox>
                    <Checkbox style={{ marginLeft: "10px" }}></Checkbox>
                </div>
            )
        }
    ];

    const data = monitoringObjectTrackers.map((el) => ({ ...el, key: el.trobject_id }));
    const trackerDetailsItems = Object.entries(trackerDetails);

    return (
        <div className="monitoring-trackers-tab">
            {!isSharedObject && (
                <div>
                    <Button onClick={() => setOpenCreateTracker(true)} type="primary" style={{ marginBottom: "20px" }}>
                        {t("trackerManagement.createTracker")}
                    </Button>
                    <Button onClick={() => setOpenAssignTracker(true)} type="primary" style={{ marginBottom: "20px" }}>
                        {t("trackerManagement.assignTracker")}
                    </Button>
                </div>
            )}
            <section className="monitoring-trackers-content">
                <Table
                    style={expandMap ? { display: "none" } : {}}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div
                                className="sub-row-item"
                                style={{
                                    margin: 0
                                }}
                            >
                                <div>
                                    {trackerDetailsItems.map((el, i) => (
                                        <div key={i} className="tracker-details-item">
                                            <b>{t(`trackerManagement.${el[1]}`)}:</b>
                                            <p>{el[1] === "tr_paid" ? dateConvert(record[el[0]]) : record[el[0]]}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button danger icon={<DisconnectOutlined />} onClick={handleUnassignTracker(record.trobject_id)} />
                            </div>
                        ),
                        rowExpandable: (record) => record.name !== "Not Expandable"
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={data.length > 9}
                    className="monitoring-trackers-table"
                />
                {user.prefered_map === "google" ? (
                    <GlobalGoogleMap
                        height={expandMap ? "calc(100vh - 240px)" : "60vh"}
                        setExpandMap={setExpandMap}
                        onLoad={(map) => {
                            const bounds = new window.google.maps.LatLngBounds();
                            map.fitBounds(bounds);
                        }}
                        // eslint-disable-next-line no-unused-vars
                        onUnmount={(map) => {
                            // do your stuff before map is unmounted
                        }}
                        items={monitoringObjectTrackers}
                    />
                ) : user.prefered_map === "yandex" ? (
                    <GlobalYandexMap height={expandMap ? "calc(100vh - 240px)" : "60vh"} setExpandMap={setExpandMap} items={monitoringObjectTrackers} />
                ) : <GlobalOSMap height={expandMap ? "calc(100vh - 240px)" : "60vh"} setExpandMap={setExpandMap} items={monitoringObjectTrackers}/>}
            </section>
            {openCreateTracker && (
                <TrackerEditModal
                    t={t}
                    open={openCreateTracker}
                    handleCancel={handleCancelCreateTracker}
                    item={trackerData}
                    setItem={setTrackerData}
                    mode={"create"}
                    handleSubmit={handleCreateTracker}
                />
            )}

            {openAssignTracker && <AssignTrackerModal t={t} open={openAssignTracker} handleCancel={handleCancelAssignTracker} objId={id} />}
        </div>
    );
};

export default React.memo(MonitoringObjectTrackersTab);
