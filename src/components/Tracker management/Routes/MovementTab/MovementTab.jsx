import React from "react";
import "./MovementTab.scss";
import { Button, Table } from "antd";
import { dateConvert, dateDifference } from "../../../../utils/dateConvert";
import { useSelector } from "react-redux";

const MovementTab = ({ t, setNewMarkers }) => {
    const currentTrackerMovements = useSelector((state) => state.trackersReducer.movementsSummary);

    const data = currentTrackerMovements?.movement_summary?.map((el, i) => ({...el, key: i}));

    const columns = [
        {
            title: t("common.type"),
            dataIndex: "type",
            key: "type"
        },
        {
            title: t("common.address"),
            dataIndex: "address",
            key: "address",
            render: (text, params) => (
                <Button
                    onClick={() => {
                        params.type !== "movement" ? 
                            setNewMarkers( prev => 
                                ([...prev, 
                                    {       trobject_latitude: params.start_coordinates[0], 
                                        trobject_longitude: params.start_coordinates[1], 
                                        trobject_name: currentTrackerMovements.tracker_name,
                                        color: currentTrackerMovements.tracker_color,
                                        mode: "none"
                                    }]))
                            : setNewMarkers( prev => 
                                ([...prev, 
                                    {   trobject_latitude: params.start_coordinates[0], 
                                        trobject_longitude: params.start_coordinates[1], 
                                        trobject_name: currentTrackerMovements.tracker_name,
                                        color: currentTrackerMovements.tracker_color,
                                        mode: "start"
                                    }, 
                                    {   trobject_latitude: params.end_coordinates[0], 
                                        trobject_longitude: params.end_coordinates[1], 
                                        trobject_name: currentTrackerMovements.tracker_name,
                                        color: currentTrackerMovements.tracker_color,
                                        mode: "finish"
                                    }]));
                    }}
                >
                    {t("common.showAddress")}
                </Button>
            )
        },
        {
            title: t("common.startDate"),
            dataIndex: "start_datetime",
            key: "start_datetime",
            render: (text) => <p style={{ margin: 0 }}>{dateConvert(text)}</p>
        },
        {
            title: t("common.endDate"),
            dataIndex: "end_datetime",
            key: "end_datetime",
            render: (text) => <p style={{ margin: 0 }}>{dateConvert(text)}</p>
        },
        {
            title: t("common.distance"),
            dataIndex: "distance",
            key: "distance",
            render: (text) => (
                <p style={{ margin: "0" }}>
                    {text.toFixed(2)} {t("common.km")}
                </p>
            )
        },
        {
            title: t("common.time"),
            dataIndex: "time",
            key: "time",
            render: (text, params) => <p style={{ margin: "0" }}>{dateDifference(params.start_datetime, params.end_datetime)}</p>
        }
    ];

    return  <div>
        <Table dataSource={data} columns={columns} size="small" pagination={false} scroll={{y: 530 }}/>
    </div>;
};

export default React.memo(MovementTab);
