import React, { useEffect, useState } from "react";
import "./MovementTab.scss";
import { Button, Table } from "antd";
import { dateConvert, dateDifference, formatDateToUTC } from "../../../../utils/dateConvert";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovementsRoutes, fetchTrackerMovementRoutes, setAddressMovementAction } from "../../../../redux/trackersReducer";
import { getAddressGoogleAndSetMovement, getAddressYandexAndSetMovement } from "../../../../utils/getAddress";

const MovementTab = ({ t, setNewMarkers, summary }) => {
    const dispatch = useDispatch();

    const currentTrackerMovements = useSelector((state) => state.trackersReducer.movementsSummary);
    const movementsRoutesList = useSelector((state) => state.trackersReducer.routesMovementsSummary);
    const userMap = useSelector((state) => state.authReducer.user).prefered_map;

    const data = currentTrackerMovements ? currentTrackerMovements[0]?.movement_summary?.map((el, i) => ({ ...el, key: i })) : [];

    const [clickedMovements, setClickedMovements] = useState([]);

    useEffect(() => {
        const currentMovements = movementsRoutesList.find((item) => item.tracker_id === summary.tracker_id);

        currentTrackerMovements &&
            movementsRoutesList.length > 0 &&
            setNewMarkers((prev) => [
                ...prev,
                {
                    latitude: currentMovements?.route_summary.coordinates[0][0],
                    longitude: currentMovements?.route_summary.coordinates[0][1],
                    name: currentTrackerMovements[0]?.tracker_name,
                    color: currentTrackerMovements[0]?.tracker_color,
                    mode: "start"
                },
                {
                    latitude: currentMovements?.route_summary.coordinates[currentMovements?.route_summary.coordinates.length - 1][0],
                    longitude: currentMovements?.route_summary.coordinates[currentMovements?.route_summary.coordinates.length - 1][1],
                    name: currentTrackerMovements[0]?.tracker_name,
                    color: currentTrackerMovements[0]?.tracker_color,
                    mode: "finish"
                }
            ]);

    }, [movementsRoutesList]);

    useEffect(() => {
        dispatch(
            fetchMovementsRoutes(
                // eslint-disable-next-line max-len
                `start_datetime=${summary.start_datetime}&end_datetime=${summary.end_datetime}&types[]=movement_summary&tracker_ids[]=${summary.tracker_id}&verbose=true`
            )
        );
        setClickedMovements([]);
    }, [summary]);

    const setAddressCallback = (id, address, datetime, field) => dispatch(setAddressMovementAction(id, address, datetime, field));

    const columns = [
        {
            title: t("type"),
            dataIndex: "type",
            key: "type"
        },
        {
            title: t("address"),
            dataIndex: "address",
            key: "address",
            render: (text, params) =>
                params.start_address && params.type === "movement" && clickedMovements?.find(el => el === params.start_datetime) ? (
                    <div>
                        <span>
                            <b>From: </b>
                            {params.start_address}
                        </span>
                        <br />
                        <span>
                            <b>To: </b>
                            {params.end_address}
                        </span>
                    </div>
                ) : params.start_address && params.type !== "movement"  && clickedMovements?.find(el => el === params.start_datetime) ? (
                    params.start_address
                ) : (
                    <Button
                        onClick={() => {
                            setClickedMovements([...clickedMovements, params.start_datetime]);
                            const formattedDate = [params.start_datetime, params.end_datetime].map((date) => formatDateToUTC(date));
                            const tracker = `tracker_ids[]=${summary.tracker_id}`;
                            // eslint-disable-next-line max-len
                            const routesUrl = `start_datetime=${formattedDate[0]}&end_datetime=${formattedDate[1]}&${tracker}&verbose=true&types[]=route_summary`;
                            if(!params.start_address) {userMap === "yandex" ?
                                getAddressYandexAndSetMovement(
                                    params.start_coordinates[0],
                                    params.start_coordinates[1],
                                    summary.tracker_id,
                                    params.start_datetime,
                                    "start_address",
                                    setAddressCallback) 
                                : getAddressGoogleAndSetMovement(
                                    params.start_coordinates[0],
                                    params.start_coordinates[1],
                                    summary.tracker_id,
                                    params.start_datetime,
                                    "start_address",
                                    setAddressCallback
                                );}

                            if (params.type !== "movement") {
                                setNewMarkers((prev) => [
                                    ...prev,
                                    {
                                        latitude: params.start_coordinates[0],
                                        longitude: params.start_coordinates[1],
                                        name: currentTrackerMovements[0].tracker_name,
                                        color: currentTrackerMovements[0].tracker_color,
                                        mode: "none"
                                    }
                                ]);
                            } else {
                                dispatch(fetchTrackerMovementRoutes(routesUrl));

                                if(!params.start_address)  {userMap === "yandex" ?
                                    getAddressYandexAndSetMovement(
                                        params.end_coordinates[0], params.end_coordinates[1],
                                        summary.tracker_id,
                                        params.start_datetime,
                                        "end_address",
                                        setAddressCallback) 
                                    : getAddressGoogleAndSetMovement(
                                        params.end_coordinates[0], params.end_coordinates[1],
                                        summary.tracker_id,
                                        params.start_datetime,
                                        "end_address",
                                        setAddressCallback
                                    );}

                               
                            }
                        }}
                    >
                        {t("show_address")}
                    </Button>
                )
        },
        {
            title: t("start_date"),
            dataIndex: "start_datetime",
            key: "start_datetime",
            render: (text) => <p style={{ margin: 0 }}>{dateConvert(text)}</p>
        },
        {
            title: t("end_date"),
            dataIndex: "end_datetime",
            key: "end_datetime",
            render: (text) => <p style={{ margin: 0 }}>{dateConvert(text)}</p>
        },
        {
            title: t("distance"),
            dataIndex: "distance",
            key: "distance",
            render: (text) => (
                <p style={{ margin: "0" }}>
                    {text.toFixed(2)} {t("km")}
                </p>
            )
        },
        {
            title: t("time"),
            dataIndex: "time",
            key: "time",
            render: (text, params) => <p style={{ margin: "0" }}>{dateDifference(params.start_datetime, params.end_datetime)}</p>
        }
    ];

    return <div>{currentTrackerMovements && <Table dataSource={data} columns={columns} size="small" pagination={false} scroll={{ y: 530 }} />}</div>;
};

export default React.memo(MovementTab);
