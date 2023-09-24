import React, { useEffect, useState } from "react";
import "./Routes.scss";
import { Button, Card, Form, Select, Table, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovementsRoutes, fetchPointsRoutes, fetchTracker, fetchTrackerModels, fetchTrackerRoutes, fetchTrackers } from "../../../redux/trackersReducer";
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

//! ПРИ ВЫБОРЕ ОДНОГО РОУТА ОСТАЛЬНЫЕ РОУТЫ НА КАРТЕ НЕ ИСЧЕЗАЮТ, ПОФИКСИТЬ ПРИ НАЛИЧИИ БОЛЬШЕГО КОЛИЧЕСТВА РОУТОВ С ДАННЫМИ
const Routes = ({ t }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const trackersList = useSelector((state) => state.trackersReducer.trackersList);
    const routesList = useSelector((state) => state.trackersReducer.routesList);
    const movementsSummaryFetchStatus = useSelector((state) => state.trackersReducer.movementsSummaryFetchStatus);

    const [dynamicRoutesList, setDynamicRoutesList] = useState([]);
    const [expandMap, setExpandMap] = useState(false);
    const [selectedTrackers, setSelectedTrackers] = useState(null);
    const [selectedRange, setSelectedRange] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [newMarkers, setNewMarkers] = useState([]);
    const [googleMapOptions, setGoogleMapOptions] = useState(initGoogleOptions);
    const [openDetailsTabs, setOpenDetailsTabs] = useState(false);

    useEffect(() => {
        dispatch(fetchTrackers(user.user_id));
        dispatch(fetchTrackerModels());
    }, [dispatch]);
console.log(routesList);
    //устанавливаем маркеры для роутов
    useEffect(() => {
        routesList &&
            setNewMarkers(
                routesList.filter(el => el.coordinates.length > 0).flatMap((route) => {
                    const { coordinates, trobject_id, trobject_name, color } = route;
                    const [first, ...rest] = coordinates;
                    const last = rest.pop();
                    const [lat1, long1] = first;
                    const [lat2, long2] = last;
                    return [
                        { trobject_latitude: lat1, trobject_longitude: long1, trobject_id, trobject_name, mode: "start", color },
                        { trobject_latitude: lat2, trobject_longitude: long2, trobject_id, trobject_name, mode: "finish", color }
                    ];
                })
            );
        routesList && setDynamicRoutesList(routesList);
    }, [routesList]);

    useEffect(() => {
        setTimeout(() => {
            setGoogleMapOptions({ ...googleMapOptions, zoom: 12 });
        }, 300);
    }, []);

    const preferedMapOptions = [
        { value: "google", label: t("common.google") },
        { value: "yandex", label: t("common.yandex") },
        { value: "osm", label: t("common.osm") }
    ];

    const tabs = [
        {
            key: "1",
            label: t("trackerManagement.movementStop"),
            children: <MovementTab t={t} setNewMarkers={setNewMarkers} />
        },
        {
            key: "2",
            label: t("trackerManagement.graphs"),
            children: <GraphsTab t={t} />
        },
        {
            key: "3",
            label: t("trackerManagement.waypoints"),
            children: <WaypointsTab t={t} />
        }
    ];

    const columns = [
        {
            title: t("common.name"),
            dataIndex: "trobject_name",
            key: "trobject_name",
            render: (text, params) => <div style={{display: "flex"}}><div className="indicator" style={{ background: params.color }}></div>{text}</div>
        },
        {
            title: t("common.period"),
            dataIndex: "period",
            key: "period",
            render: (text, params) => (
                <div>
                    <p style={{ margin: "0" }}>{params.start_datetime}</p>
                    <p style={{ margin: "0" }}>{params.end_datetime}</p>
                </div>
            )
        },
        {
            title: t("common.distance"),
            dataIndex: "distance",
            key: "distance",
            render: (text, params) => (
                <div>
                    <p style={{ margin: "0" }}>
                        {params.distance.toFixed(2)} {t("common.km")}
                    </p>
                </div>
            )
        }
    ];

    const data = routesList.map((el) => ({
        ...el,
        key: el.trobject_id,
        start_datetime: dateConvert(el.start_datetime),
        end_datetime: dateConvert(el.end_datetime)
    }));

    const changeMap = (value) => dispatch(updateUser(user.user_id, { prefered_map: value }));

    const onFinishForm = (val) => {
        const formattedDate = val.date.map((date) => date.format("DD.MM.YYYY HH:mm")); //"YYYY-MM-DD HH:mm"
        const trackers = val.object.map((el) => `tracker_ids[]=${el}`).join("&");
        const routesUrl = `start_datetime=${formattedDate[0]}&end_datetime=${formattedDate[1]}&${trackers}`;
        // setSelectedDate(formattedDate);
        dispatch(fetchTrackerRoutes(routesUrl));
        // eslint-disable-next-line no-console
        console.log(formattedDate, "values");
    };

    const disableButton = !selectedTrackers || selectedTrackers.trackers.length === 0 || selectedRange.length === 0 || !selectedRange;

    const handleSelect = (value) => {
        setSelectedTrackers({ ...selectedTrackers, trackers: value });
    };

    const onChangeTab = (key) => {
        // eslint-disable-next-line no-console
        console.log(key);
    };

    const selectReportAndFetchTracker = (report) => {
        setSelectedReport(report);
        // dispatch(fetchTracker(report.trobject_id));
    };


    return (
        <div className="routes">
            <section className="head-section">
                <h2>{t("menuBar.routes")}</h2>
                <div>
                    <Button onClick={() => setDynamicRoutesList([])}>{t("trackerManagement.clearWays")}</Button>
                    <Button style={{ marginRight: 20 }} onClick={() => setNewMarkers([])}>
                        {t("trackerManagement.clearPoints")}
                    </Button>
                    <Select
                        allowClear
                        style={{
                            width: "200px",
                            float: "right"
                        }}
                        placeholder={t("login.selectMap")}
                        defaultValue={user.prefered_map}
                        onChange={changeMap}
                        options={preferedMapOptions}
                    />
                </div>
            </section>

            <section className="routes-content">
                <div>
                    <Form onFinish={onFinishForm} className="routes-form" style={expandMap ? { display: "none" } : {}}>
                        <Form.Item label={t("menuBar.trackers")} name="object">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: "400px", float: "right" }}
                                placeholder="Please select"
                                value={selectedTrackers}
                                onChange={handleSelect}
                                options={trackersList.map((el) => ({ label: el.trobject_name, value: el.trobject_id }))}
                            />
                        </Form.Item>
                        <GeneralDatePicker t={t} setSelectedRange={setSelectedRange} selectedRange={selectedRange} />
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={disableButton}>
                                {t("common.submit")}
                            </Button>
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
                                            selectReportAndFetchTracker(record);
                                            dispatch(
                                                fetchMovementsRoutes(
                                                    record.trobject_id,
                                                    // eslint-disable-next-line max-len
                                                    `start_datetime=${record.start_datetime}&end_datetime=${record.end_datetime}&types[]=movement_summary&verbose=true`
                                                )
                                            );
                                        }}
                                        disabled={record.id !== selectedReport?.id}
                                    >
                                        {t("trackerManagement.movementStop")}
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setOpenDetailsTabs(true);
                                            selectReportAndFetchTracker(record);
                                            dispatch(
                                                fetchPointsRoutes(
                                                    record.trobject_id,
                                                    // eslint-disable-next-line max-len
                                                    //`start_datetime=${record.start_datetime}&end_datetime=${record.end_datetime}`
                                                    //"start_datetime=21.09.2023 00:00&end_datetime=21.09.2023 23:59"
                                                    "start_datetime=21.09.2023 00:00&end_datetime=21.09.2023 23:59"
                                                )
                                            );
                                        }}
                                        disabled={record.id !== selectedReport?.id}
                                    >
                                        {t("trackerManagement.graphs")}
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            selectReportAndFetchTracker(record);
                                            setOpenDetailsTabs(true);
                                        }}
                                        disabled={record.id !== selectedReport?.id}
                                    >
                                        {t("trackerManagement.waypoints")}
                                    </Button>
                                </div>
                            ),
                            rowExpandable: (record) => record.name !== "Not Expandable"
                        }}
                        columns={columns}
                        dataSource={data}
                        pagination={data.length > 9}
                        className="trackers-table"
                    />
                </div>

                <div style={{ width: "100%" }}>
                    {user.prefered_map === "google" ? (
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
                    ) : user.prefered_map === "yandex" ? (
                        <GlobalYandexMap height={expandMap ? "calc(100vh - 240px)" : "60vh"} setExpandMap={setExpandMap} items={trackersList} t={t} />
                    ) : (
                        <GlobalOSMap height={expandMap ? "calc(100vh - 240px)" : "60vh"} setExpandMap={setExpandMap} items={trackersList} t={t} />
                    )}
                    {openDetailsTabs && movementsSummaryFetchStatus === "fulfilled" && (
                        <Card className="routes-details">
                            {selectedReport && (
                                <p className="tabs-header">
                                    <b>{selectedReport.trobject_name}</b>
                                    {` [${selectedReport.start_datetime} - ${selectedReport.end_datetime}]`}
                                </p>
                            )}
                            <Tabs defaultActiveKey="1" items={tabs} onChange={onChangeTab} />
                        </Card>
                    )}
                </div>
            </section>
        </div>
    );
};

export default React.memo(Routes);
