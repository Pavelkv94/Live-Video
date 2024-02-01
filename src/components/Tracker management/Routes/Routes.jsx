import React, { useEffect, useState } from "react";
import "./Routes.scss";
import { Button, Card, Form, Select, Spin, Table, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearMovements, clearPoints, fetchTrackerModels, fetchTrackerRoutes, fetchTrackers } from "../../../redux/trackersReducer";
import { dateConvert } from "../../../utils/dateConvert";
import GlobalGoogleMap from "../../general/GlobalGoogleMap";
import GlobalYandexMap from "../../general/GlobalYandexMap";
import GlobalOSMap from "../../general/GlobalOSMap";
import { updateUser } from "../../../redux/authReducer";
import GeneralDatePicker from "../../general/GeneralDatePicker";
import MovementTab from "./MovementTab/MovementTab";
import GraphsTab from "./GraphsTab/GraphsTab";
import WaypointsTab from "./WaypointsTab/WaypointsTab";
import { initGoogleOptions } from "../../general/initialData";
import { fetchMonitoringObjectTrackers } from "../../../redux/monitoringObjectsReducer";
import { useParams } from "react-router";

//! ПРИ ВЫБОРЕ ОДНОГО РОУТА ОСТАЛЬНЫЕ РОУТЫ НА КАРТЕ НЕ ИСЧЕЗАЮТ, ПОФИКСИТЬ ПРИ НАЛИЧИИ БОЛЬШЕГО КОЛИЧЕСТВА РОУТОВ С ДАННЫМИ
const Routes = ({ t, isMobileSize }) => {
    const { id } = useParams();

    const trackersList = useSelector((state) => state.trackersReducer.trackersList);
    const monitoringObjectTrackers = useSelector((state) => state.monitoringObjectsReducer.monitoringObjectTrackers);
    const trackers = id ? monitoringObjectTrackers : trackersList;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const connected_user = useSelector(state => state.authReducer.connectedUser);
    const routesList = useSelector((state) => state.trackersReducer.routesList);
    const routesFetchStatus = useSelector((state) => state.trackersReducer.routesFetchStatus);
    const movementsRoutesList = useSelector((state) => state.trackersReducer.routesMovementsSummary);
    const movementsSummaryFetchStatus = useSelector((state) => state.trackersReducer.movementsSummaryFetchStatus);
    const waypointsSummaryFetchStatus = useSelector((state) => state.trackersReducer.waypointsSummaryFetchStatus);

    const [dynamicRoutesList, setDynamicRoutesList] = useState([]);
    const [expandMap, setExpandMap] = useState(false);
    const [selectedTrackers, setSelectedTrackers] = useState(null);
    const [selectedRange, setSelectedRange] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [newMarkers, setNewMarkers] = useState([]);
    const [googleMapOptions, setGoogleMapOptions] = useState(initGoogleOptions);
    const [openDetailsTabs, setOpenDetailsTabs] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    useEffect(() => {
        // dispatch(fetchTrackers(user.id));
        dispatch(fetchTrackerModels());
    }, [dispatch]);

    useEffect(() => {
        !id ? dispatch(fetchTrackers(user.id)) : dispatch(fetchMonitoringObjectTrackers(id));
    }, [id]);

    useEffect(() => {
        movementsRoutesList.length && setDynamicRoutesList((prev) => [...prev, ...movementsRoutesList]);
    }, [movementsRoutesList]); 
    
    //устанавливаем маркеры для роутов
    useEffect(() => {
        routesList &&
            setNewMarkers(
                routesList
                    .filter((el) => el.route_summary.coordinates.length > 0)
                    .flatMap((route) => {
                        const { route_summary, tracker_id, tracker_name, tracker_color } = route;
                        const [first, ...rest] = route_summary.coordinates;
                        const last = rest.pop();
                        const [lat1, long1] = first;
                        const [lat2, long2] = last;
                        return [
                            { latitude: lat1, longitude: long1, id: tracker_id, name: tracker_name, mode: "start", color: tracker_color },
                            { latitude: lat2, longitude: long2, id: tracker_id, name: tracker_name, mode: "finish", color: tracker_color }
                        ];
                    })
            );
        routesList && setDynamicRoutesList(routesList);
    }, [routesList]);

    useEffect(() => {
        setTimeout(() => {
            setGoogleMapOptions({ ...googleMapOptions, zoom: 6 });
        }, 300);
    }, []);

    const preferedMapOptions = [
        { value: "google", label: t("google") },
        { value: "yandex", label: t("yandex") },
        { value: "osm", label: t("osm") }
    ];

    const tabs = [
        {
            key: "1",
            label: t("movement_stop"),
            children: <MovementTab t={t} setNewMarkers={setNewMarkers} summary={selectedReport} />
        },
        {
            key: "2",
            label: t("graphs"),
            children: <GraphsTab t={t} summary={selectedReport} setNewMarkers={setNewMarkers} />
        },
        {
            key: "3",
            label: t("waypoints"),
            children: <WaypointsTab t={t} setNewMarkers={setNewMarkers} summary={selectedReport} />
        }
    ];

    const columns = [
        {
            title: t("name"),
            dataIndex: "tracker_name",
            key: "tracker_name",
            render: (text, params) => (
                <div style={{ display: "flex" }}>
                    <div className="indicator" style={{ background: params.tracker_color }}></div>
                    {text}
                </div>
            )
        },
        {
            title: t("period"),
            dataIndex: "period",
            key: "period",
            render: (text, params) => (
                <div>
                    <p style={{ margin: "0" }}>{dateConvert(params.route_summary.start_datetime)}</p>
                    <p style={{ margin: "0" }}>{dateConvert(params.route_summary.end_datetime)}</p>
                </div>
            )
        },
        {
            title: t("distance"),
            dataIndex: "distance",
            key: "distance",
            render: (text, params) => (
                <div>
                    <p style={{ margin: "0" }}>
                        {params.route_summary.distance.toFixed(2)} {t("km")}
                    </p>
                </div>
            )
        }
    ];

    const data = routesList?.map((el) => ({
        ...el,
        key: el.tracker_id,
        start_datetime: el.route_summary.start_datetime,
        end_datetime: el.route_summary.end_datetime
    }));

    const changeMap = (value) => dispatch(updateUser(user.id, { prefered_map: value }));

    const onFinishForm = (val) => {
        const formattedDate = val.date.map((date) => date.toISOString()); // Convert to UTC format
        const trackers = val.object.map((el) => `tracker_ids[]=${el}`).join("&");
        const routesUrl = `start_datetime=${formattedDate[0]}&end_datetime=${formattedDate[1]}&${trackers}&verbose=true&types[]=route_summary`;
        setOpenDetailsTabs(false);
        dispatch(clearMovements());
        dispatch(clearPoints());
        // setSelectedDate(formattedDate);
        dispatch(fetchTrackerRoutes(routesUrl));
    };

    const disableButton =
        !selectedTrackers || selectedTrackers.trackers.length === 0 || selectedRange.length === 0 || !selectedRange || routesFetchStatus === "pending";

    const handleSelect = (value) => {
        setSelectedTrackers({ ...selectedTrackers, trackers: value });
    };

    const selectReportAndFetchTracker = (report) => {
        setSelectedReport(report);
        // dispatch(fetchTracker(report.trobject_id));
    };

    const fieldWidth = isMobileSize ? "300px" : "400px";

    const preferedMap = user?.admin ? connected_user.prefered_map : user.prefered_map;

    return (
        <div className="routes">
            <section className="head-section">
                <h2>{t("routes")}</h2>

                <div className="head-section-actions">
                    <Button onClick={() => setDynamicRoutesList([])}>{t("clear_ways")}</Button>
                    <Button onClick={() => setNewMarkers([])}>{t("clear_points")}</Button>
                    <Select
                        allowClear
                        style={{
                            float: "right"
                        }}
                        placeholder={t("select_map")}
                        defaultValue={user.prefered_map}
                        onChange={changeMap}
                        options={preferedMapOptions}
                    />
                </div>
            </section>

            <section className="routes-content">
                <div style={{ marginBottom: "20px" }}>
                    <Form onFinish={onFinishForm} className="routes-form" style={expandMap ? { display: "none" } : {}}>
                        <Form.Item label={t("trackers")} name="object">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: fieldWidth, float: "right" }}
                                placeholder="Please select"
                                value={selectedTrackers}
                                onChange={handleSelect}
                                options={trackers.map((el) => ({ label: el.name, value: el.id }))}
                            />
                        </Form.Item>
                        <GeneralDatePicker t={t} setSelectedRange={setSelectedRange} selectedRange={selectedRange} fieldWidth={fieldWidth} />
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={disableButton}>
                                {t("submit")}
                            </Button>
                            {routesFetchStatus === "pending" && <Spin style={{ marginLeft: "20px" }} />}
                        </Form.Item>
                    </Form>
                    <Table
                        scroll={{
                            y: 600
                        }}
                        size="small"
                        style={expandMap ? { display: "none" } : {}}
                        expandable={{
                            expandedRowRender: (record) => (
                                <div
                                    className="sub-row-item"
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setOpenDetailsTabs(true);
                                            setActiveTab("1");
                                            selectReportAndFetchTracker(record);
                                        }}
                                        disabled={record.id !== selectedReport?.id}
                                    >
                                        {t("movement_stop")}
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            selectReportAndFetchTracker(record);
                                            setOpenDetailsTabs(true);
                                            setActiveTab("2");
                                        }}
                                        disabled={record.id !== selectedReport?.id}
                                    >
                                        {t("graphs")}
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            selectReportAndFetchTracker(record);
                                            setActiveTab("3");
                                            setOpenDetailsTabs(true);
                                        }}
                                        disabled={record.id !== selectedReport?.id}
                                    >
                                        {t("waypoints")}
                                    </Button>
                                </div>
                            ),
                            rowExpandable: (record) => record.name !== "Not Expandable"
                        }}
                        columns={columns}
                        dataSource={data}
                        // pagination={data.length > 9}
                        pagination={false}
                        className="trackers-table"
                    />
                </div>

                <div style={{ width: "100%" }}>
                    {preferedMap === "google" ? (
                        <GlobalGoogleMap
                            mode={"routes"}
                            mapOptions={googleMapOptions}
                            routes={routesList && dynamicRoutesList}
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
                            items={newMarkers}
                            t={t}
                        />
                    ) : preferedMap === "yandex" ? (
                        <GlobalYandexMap
                            mode={"routes"}
                            routes={routesList && dynamicRoutesList}
                            height={expandMap ? "calc(100vh - 240px)" : "60vh"}
                            setExpandMap={setExpandMap}
                            items={newMarkers}
                            t={t}
                        />
                    ) : (
                        <GlobalOSMap
                            mode={"routes"}
                            height={expandMap ? "calc(100vh - 240px)" : "60vh"}
                            setExpandMap={setExpandMap}
                            items={newMarkers}
                            t={t}
                            routes={routesList && dynamicRoutesList}
                        />
                    )}
                    {openDetailsTabs && (
                        <Card className="routes-details">
                            {selectedReport && (
                                <div className="tabs-header">
                                    <div>{(movementsSummaryFetchStatus === "pending" || waypointsSummaryFetchStatus === "pending") && <Spin />}</div>
                                    <span>
                                        <b>{selectedReport.tracker_name}</b>
                                        {` [${dateConvert(selectedReport.start_datetime)} - ${dateConvert(selectedReport.end_datetime)}]`}
                                    </span>
                                </div>
                            )}
                            <Tabs
                                items={tabs}
                                onChange={(key) => {
                                    setActiveTab(key);
                                }}
                                activeKey={activeTab}
                            />
                        </Card>
                    )}
                </div>
            </section>
        </div>
    );
};

export default React.memo(Routes);
