import React, { useEffect } from "react";
import "./WaypointsTab.scss";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { dateConvert } from "../../../../utils/dateConvert";
import { fetchPointsRoutes, setAddressWaypointAction } from "../../../../redux/trackersReducer";
import { getAddressGoogleAndSetWaypoint, getAddressYandexAndSetWaypoint } from "../../../../utils/getAddress";

const WaypointsTab = ({ t, summary, setNewMarkers }) => {
    const dispatch = useDispatch();

    const currentTrackerWaypoints = useSelector((state) => state.trackersReducer.waypointsSummary);
    const data = currentTrackerWaypoints ? currentTrackerWaypoints.map((el, i) => ({ ...el, key: i })) : [];
    const userMap = useSelector((state) => state.authReducer.user).prefered_map;

    const setAddressCallback = (id, address) => dispatch(setAddressWaypointAction(id, address));

    const columns = [
        {
            title: t("date"),
            dataIndex: "datetime",
            key: "datetime",
            render: (text) => dateConvert(text)
        },
        {
            title: t("address"),
            dataIndex: "address",
            key: "address",
            render: (text, params) =>
                params.address || (
                    <Button
                        onClick={() => {
                            userMap === "yandex"
                                ? getAddressYandexAndSetWaypoint(params.latitude, params.longitude, setAddressCallback, params.id)
                                : getAddressGoogleAndSetWaypoint(params.latitude, params.longitude, setAddressCallback, params.id);
                            setNewMarkers((prev) => [
                                ...prev,
                                {
                                    latitude: params.latitude,
                                    longitude: params.longitude,
                                    name: summary.tracker_name,
                                    color: summary.tracker_color,
                                    address: params?.address,
                                    gsmsl: params.gsmsl,
                                    satellites: params.satellites,
                                    speed: params.speed
                                }
                            ]);
                        }}
                    >
                        {t("show_address")}
                    </Button>
                )
        },
        {
            title: `${t("speed")}, ${t("kmh")}`,
            dataIndex: "speed",
            key: "speed"
        },
        {
            title: `${t("satellites")}`,
            dataIndex: "satellites",
            key: "satellites"
        },
        {
            title: `${t("gsmsl")}`,
            dataIndex: "gsmsl",
            key: "gsmsl",
            align: "center"
        }
    ];

    useEffect(() => {
        ((currentTrackerWaypoints.length > 0 && summary.tracker_id !== currentTrackerWaypoints[0].tracker_id) || currentTrackerWaypoints.length === 0) &&
            dispatch(fetchPointsRoutes(summary.tracker_id, `start_datetime=${summary.start_datetime}&end_datetime=${summary.end_datetime}`));
    }, [summary]);

    return <div>{currentTrackerWaypoints && <Table dataSource={data} columns={columns} size="small" pagination={true} />}</div>;
};

export default React.memo(WaypointsTab);
