import React, { useEffect, useState } from "react";
import "./GraphsTab.scss";
import { Radio } from "antd";
import GeneralLineChart from "../../../general/GeneralLineChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchPointsRoutes } from "../../../../redux/trackersReducer";

const GraphsTab = ({ t, summary, setNewMarkers }) => {
    const dispatch = useDispatch();

    const [graphMode, setGraphMode] = useState("speed");

    const currentTrackerWaypoints = useSelector((state) => state.trackersReducer.waypointsSummary);

    useEffect(() => {
        ((currentTrackerWaypoints.length > 0 && summary.tracker_id !== currentTrackerWaypoints[0].tracker_id) || currentTrackerWaypoints.length === 0) &&
            dispatch(fetchPointsRoutes(summary.tracker_id, `start_datetime=${summary.start_datetime}&end_datetime=${summary.end_datetime}`));
    }, [summary]);

    return (
        <div className="graph-wrapper">
            <Radio.Group value={graphMode} onChange={(e) => setGraphMode(e.target.value)}>
                <Radio.Button value="speed">{t("speed")}</Radio.Button>
                <Radio.Button value="satellites">{t("satellites")}</Radio.Button>
            </Radio.Group>
            <GeneralLineChart t={t} items={currentTrackerWaypoints} mode={graphMode} setNewMarkers={setNewMarkers} summary={summary} />
        </div>
    );
};

export default React.memo(GraphsTab);
