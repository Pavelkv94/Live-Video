import React, { useEffect, useState } from "react";
import "./MonitoringObjectTrackersTab.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AssignTrackerModal from "./AssignTrackerModal";
import Trackers from "../../../Tracker management/Trackers/Trackers";
import { createMonitoringObjectTracker, fetchMonitoringObjectTrackers } from "../../../../redux/monitoringObjectsReducer";
import UnassignTrackerModal from "./UnassignTrackerModal";

const MonitoringObjectTrackersTab = ({ t, isSharedObject, isMobileSize }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const monitoringObjectTrackers = useSelector((state) => state.monitoringObjectsReducer.monitoringObjectTrackers);

    const [openAssignTracker, setOpenAssignTracker] = useState(false);
    const [openUnassignTracker, setOpenUnassignTracker] = useState(false);

    useEffect(() => {
        dispatch(fetchMonitoringObjectTrackers(id));
    }, [dispatch]);

    const handleCancelAssignTracker = () => {
        setOpenAssignTracker(false);
    };

    const handleCreateMonitoringObjectTracker = (payload) => {
        dispatch(createMonitoringObjectTracker(id, payload));
    };

    const fetchMonitoringObjectTrackersData = () => dispatch(fetchMonitoringObjectTrackers(id));
    return (
        <div className="monitoring-trackers-tab">
            <Trackers
                t={t}
                monitoringObjectTrackers={monitoringObjectTrackers}
                isSharedObject={isSharedObject}
                setOpenAssignTracker={setOpenAssignTracker}
                setOpenUnassignTracker={setOpenUnassignTracker}
                handleCreateMonitoringObjectTracker={handleCreateMonitoringObjectTracker}
                isMobileSize={isMobileSize}
                fetchMonitoringObjectTrackersData={fetchMonitoringObjectTrackersData}
            />

            {openAssignTracker && <AssignTrackerModal t={t} open={openAssignTracker} handleCancel={handleCancelAssignTracker} objId={id} />}
            {openUnassignTracker && (
                <UnassignTrackerModal
                    t={t}
                    open={openUnassignTracker}
                    handleCancel={() => setOpenUnassignTracker(false)}
                    objId={id}
                    monitoringObjectTrackers={monitoringObjectTrackers}
                />
            )}
        </div>
    );
};

export default React.memo(MonitoringObjectTrackersTab);
