import React, { useEffect, useState } from "react";
import "./Trackers.scss";
import { Button, Checkbox, Popover, Select, Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    addSharingTracker,
    changeTrackerVisibleAC,
    createTracker,
    deleteSharingTracker,
    deleteTracker,
    fetchTrackerModels,
    fetchTrackers,
    // updateSharingTracker,
    updateTracker
} from "../../../redux/trackersReducer";
import { dateConvert, isDateExpired } from "../../../utils/dateConvert";
import { DeleteOutlined, EditOutlined, PlusOutlined, ShareAltOutlined } from "@ant-design/icons";
import GlobalGoogleMap from "../../general/GlobalGoogleMap";
import { initGoogleOptions, initSharedTrackerUser, initalTracker } from "../../general/initialData";
import TrackerEditModal from "./TrackerEditModal";
import GlobalYandexMap from "../../general/GlobalYandexMap";
import GlobalOSMap from "../../general/GlobalOSMap";
import { updateUser } from "../../../redux/authReducer";
import { fetchTrackersTariffs } from "../../../redux/tariffsReducer";
import GeneralSharedModal from "../../general/GeneralSharedModal";
import TrackerDetailsModal from "./TrackerDetailsModal";
import GeneraPermissionsModal from "../../general/GeneraPermissionsModal";
import { DeleteModal } from "../../general/DeleteModal";
import { fetchData } from "../../../api/api";
import { trackersAllUrl } from "../../../redux/AppConstants";

const Trackers = ({
    t,
    isMobileSize,
    monitoringObjectTrackers,
    setOpenAssignTracker,
    setOpenUnassignTracker,
    handleCreateMonitoringObjectTracker,
    fetchMonitoringObjectTrackersData
}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const connected_user = useSelector(state => state.authReducer.connectedUser);

    const trackers = useSelector((state) => state.trackersReducer.trackersList);
    const trackersListStatus = useSelector((state) => state.trackersReducer.trackersFetchStatus);

    const [open, setOpen] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    const [tracker, setTracker] = useState(initalTracker);
    const [expandMap, setExpandMap] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [trackersList, setTrackerList] = useState([]); //fake
    const [realTimeTrackers, setRealTimeTrackers] = useState([]);
    const [mapGoogleOptions, setMapGoogleOptions] = useState(initGoogleOptions);
    const [openSharedModal, setOpenSharedModal] = useState(false);
    const [sharedUser, setSharedUser] = useState(initSharedTrackerUser);
    const [sharedTracker, setSharedTracker] = useState(null);
    const [openPermissionsModal, setOpenPermissionsModal] = useState(false);
    const [checkedSharedUser, setCheckedSharedUser] = useState(null);
    const [sharedActionMode, setSharedActionMode] = useState("create");
    const [polylinesVisible, setPolylinesVisible] = useState(null);
    const [realtimeCheck, setRealtimeCheck] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteModalMode, setDeleteModalMode] = useState("shared user");

    useEffect(() => {
        setTrackerList(monitoringObjectTrackers || trackers);

        setPolylinesVisible(
            trackers.reduce((acc, curr) => {
                acc[curr.id] = false;
                return acc;
            }, {})
        );
        setRealtimeCheck(
            trackersList.reduce((acc, curr) => {
                acc[curr.id] = false;
                return acc;
            }, {})
        );
    }, [trackers, monitoringObjectTrackers]);

    useEffect(() => {
        let intervalId;
        if (realTimeTrackers.length > 0) {
            intervalId = setInterval(() => {
                const response = fetchData(trackersAllUrl(user.id), {}, {});
                response.then((response) => {
                    setRealTimeTrackers(
                        realTimeTrackers.map((arr) => {
                            const mergedArr = [
                                ...arr,
                                ...response
                                    .filter((obj) => obj.id === arr[0].id)
                                    .map((el) => ({ id: el.id, lat: el.latitude, lng: el.longitude, color: el.color }))
                            ];
                            return mergedArr;
                        })
                    );
                    setTrackerList(
                        trackersList.map((obj1) => {
                            const obj2 = response.find((obj2) => obj2.id === obj1.id);
                            return obj2 && realTimeTrackers.find((el) => el[0].id === obj1.id) ? { ...obj1, ...obj2 } : obj1;
                        })
                    );
                });
            }, 6000);
        }
        // eslint-disable-next-line no-console
        console.log("request every 6 sec");

        return () => {
            clearInterval(intervalId);
        };
    }, [realTimeTrackers, trackersList]);

    useEffect(() => {
        !monitoringObjectTrackers && dispatch(fetchTrackers(user.id));
        dispatch(fetchTrackerModels());
        dispatch(fetchTrackersTariffs());
    }, [dispatch]);

    const openEditModal = (data) => () => {
        setTracker(data);
        setModalMode("edit");
        setOpen(true);
    };

    const handleChangeVisible = (tracker_id) => (e) => {
        if (!e.target.checked) {
            setRealtimeCheck({ ...realtimeCheck, [tracker_id]: false });
            setRealTimeTrackers([]);
        }
        dispatch(changeTrackerVisibleAC(tracker_id, e.target.checked));
    };

    const handleChangeRealtimeTracker = (tracker) => (e) => {
        setRealtimeCheck({ ...realtimeCheck, [tracker.id]: e.target.checked });
        if (e.target.checked) {
            setRealTimeTrackers([...realTimeTrackers, [{ id: tracker.id, lat: tracker.latitude, lng: tracker.longitude, color: tracker.color }]]);
        } else {
            setRealTimeTrackers(realTimeTrackers.filter((el) => el[0].id !== tracker.id));
            setPolylinesVisible({ ...polylinesVisible, [tracker.id]: false });
        }
    };

    const handleCancelShared = () => {
        setOpenSharedModal(false);
        setSharedUser(initSharedTrackerUser);
        setSharedTracker(null);
    };

    const handleAddSharedUser = () => {
        dispatch(addSharingTracker(sharedTracker, { email: sharedUser.email, tracker_id: sharedTracker, permissions: { edit: sharedUser.edit } }));
        handleCancelShared();
    };

    const handleChangeVisiblePolylines = (tracker) => (e) => {
        setPolylinesVisible({ ...polylinesVisible, [tracker.id]: e.target.checked });
    };

    const preferedMapOptions = [
        { value: "google", label: t("google") },
        { value: "yandex", label: t("yandex") },
        { value: "osm", label: t("osm") }
    ];

    const visiblePopup = <div>{t("visible_on_map")}</div>;
    const movementPopup = <div>{t("movement_on_map")}</div>;
    const visiblePolylinesPopup = <div>{t("visible_polylines")}</div>;

    const columns = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            render: (text, params) => (
                <div style={{ display: "flex" }}>
                    <span
                        style={isDateExpired(params.paid_till) ? {} : { color: "#1677ff", cursor: "pointer" }}
                        onClick={() =>
                            setMapGoogleOptions({
                                center: { lat: +params.latitude, lng: +params.longitude },
                                zoom: 8
                            })
                        }
                    >
                        {text} {isDateExpired(params.paid_till) && <i style={{ color: "red" }}>({t("expired")})</i>}
                    </span>
                    {params.user_id !== user.id && <ShareAltOutlined style={{ marginLeft: 5 }} />}
                </div>
            )
        },
        {
            title: t("last_activity"),
            dataIndex: "datetime",
            key: "datetime",
            align: "center",
            render: (text) => <p style={{ width: "120px" }}>{text ? dateConvert(text) : "—"}</p>
        },
        {
            title: `${t("speed")}, ${t("kmh")}`,
            dataIndex: "speed",
            key: "Speed",
            align: "center",
            render: (text) => <div>{text || "—"}</div>
        },
        {
            title: t("visible"),
            dataIndex: "visible",
            key: "visible",
            render: (text, params) => {
                return (
                    <div className="flex">
                        <div className="indicator" style={{ background: params.color }}></div>
                        <Popover content={visiblePopup}>
                            <Checkbox onChange={handleChangeVisible(params.id)} checked={params.isVisibleOnMap}></Checkbox>
                        </Popover>
                        <Popover content={movementPopup}>
                            <Checkbox
                                checked={realtimeCheck[params.id]}
                                style={{ marginLeft: "10px" }}
                                onChange={handleChangeRealtimeTracker(params)}
                                disabled={isDateExpired(params.paid_till) || !params.isVisibleOnMap}
                            ></Checkbox>
                        </Popover>
                        <Popover content={visiblePolylinesPopup}>
                            <Checkbox
                                checked={polylinesVisible[params.id]}
                                style={{ marginLeft: "10px" }}
                                onChange={handleChangeVisiblePolylines(params)}
                                disabled={isDateExpired(params.paid_till) || !realTimeTrackers.find((el) => el[0].id === params.id)}
                            ></Checkbox>
                        </Popover>
                    </div>
                );
            }
        }
    ];

    const data = trackersList.map((el) => ({
        ...el,
        key: el.id
    }));

    const handleCreateTracker = () => {
        monitoringObjectTrackers
            ? handleCreateMonitoringObjectTracker({ ...tracker, tracker_tariff_id: 5 })
            : dispatch(createTracker(user.id, { ...tracker, tracker_tariff_id: 5 })); //! какой тариф?
        setTracker(initalTracker);
        setOpen(false);
    };

    const handleUpdateTracker = () => {
        dispatch(
            updateTracker(
                tracker.id,
                {
                    name: tracker.name,
                    imei: tracker.imei,
                    phone: tracker.phone,
                    public: tracker.tublic,
                    info: tracker.info,
                    average_consumption: tracker.average_consumption,
                    tracker_model_id: tracker.tracker_model_id,
                    stopping_time: tracker.stopping_time,
                    parking_time: tracker.parking_time,
                    color: tracker.color
                },
                tracker.isVisibleOnMap
            )
        );
        setTracker(initalTracker);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        setTracker(initalTracker);
    };

    const handleCancelDetails = () => {
        setOpenDetailsModal(false);
        setTracker(initalTracker);
    };

    const changeMap = (value) => dispatch(updateUser(user.admin ? connected_user.id : user.id, { prefered_map: value }, user.admin));

    const handleOpenPermission = (user) => {
        setOpenPermissionsModal(true);
        setCheckedSharedUser(user);
    };

    const handleClosePermissions = () => {
        setOpenPermissionsModal(false);
        setCheckedSharedUser(null);
    };

    const deleteSharedUser = (user) => {
        setDeleteModalMode("shared user");
        setOpenDeleteModal(true);
        setCheckedSharedUser(user);
    };

    const handleSubmitDeleteSharedUser = () => {
        dispatch(deleteSharingTracker(checkedSharedUser.tracker_id, checkedSharedUser.id));
        setCheckedSharedUser(null);
        setOpenDeleteModal(false);
        // setTracker({ ...tracker, shared_to: tracker.shared_to.filter((el) => el.id !== checkedSharedUser.id) });
    };

    const handleSubmitDeleteTracker = () => {
        dispatch(deleteTracker(tracker.id));
        setOpenDeleteModal(false);
        setTracker(null);
    };

    const handleEditSharedUser = () => {
        // dispatch(updateSharingTracker(checkedSharedUser.id, sharedUser));
    };

    const handleOpenSharedUser = (user) => {
        setOpenSharedModal(true);
        setCheckedSharedUser(user);
        setSharedUser(user);
        setSharedActionMode("edit");
    };

    const preferedMap = user?.admin ? connected_user?.prefered_map : user?.prefered_map;
    return (
        <div className="trackers">
            <section className="head-section">
                <div className="head-section-title">
                    {!monitoringObjectTrackers && <h2>{t("trackers")}</h2>}
                    {monitoringObjectTrackers ? (
                        <div>
                            <Button
                                onClick={() => {
                                    setModalMode("create");
                                    setOpen(true);
                                }}
                                type="primary"
                                style={{ margin: "0" }}
                            >
                                {t("create_tracker")}
                            </Button>
                            <Button onClick={() => setOpenAssignTracker(true)} type="primary">
                                {t("assign_tracker")}
                            </Button>
                            <Button style={{ margin: "0" }} onClick={() => setOpenUnassignTracker(true)}>
                                {t("unassign_tracker")}
                            </Button>
                        </div>
                    ) : (
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setModalMode("create");
                                setOpen(true);
                            }}
                        />
                    )}
                    {trackersListStatus === "pending" && <Spin style={{ marginLeft: "20px" }} />}
                </div>
                <div className="head-section-actions">
                    <Button
                        onClick={() => setRealTimeTrackers([])}
                        size={isMobileSize ? "small" : "middle"}
                        style={monitoringObjectTrackers ? { margin: "0" } : {}}
                    >
                        {t("clear_map")}
                    </Button>
                    <Button
                        size={isMobileSize ? "small" : "middle"}
                        style={{ marginRight: 20 }}
                        onClick={() => (monitoringObjectTrackers ? fetchMonitoringObjectTrackersData() : dispatch(fetchTrackers(user.id)))}
                    >
                        {t("refresh_map")}
                    </Button>

                    <Select
                        size={isMobileSize ? "small" : "middle"}
                        allowClear
                        style={{
                            width: "200px",
                            float: "right"
                        }}
                        placeholder={t("select_map")}
                        defaultValue={user?.admin ? connected_user?.prefered_map : user?.prefered_map}
                        onChange={changeMap}
                        options={preferedMapOptions}
                    />
                </div>
            </section>
            <section className="trackers-content">
                <Table
                    scroll={{
                        y: 600
                    }}
                    size="small"
                    style={expandMap ? { display: "none" } : {}}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setOpenDetailsModal(true);
                                        setTracker(record);
                                    }}
                                >
                                    {t("show_info")}
                                </Button>

                                {!record.shared && (
                                    <Button icon={<EditOutlined />} onClick={openEditModal(record)}>
                                        {t("edit")}
                                    </Button>
                                )}
                                {record.user_id === user.id && (
                                    <Button
                                        icon={<ShareAltOutlined />}
                                        onClick={() => {
                                            setSharedActionMode("create");
                                            setSharedTracker(record.id);
                                            setOpenSharedModal(true);
                                        }}
                                    >
                                        {t("share")}
                                    </Button>
                                )}
                                {record.user_id === user.id && (
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => {
                                            setTracker(record);
                                            setOpenDeleteModal(true);
                                            setDeleteModalMode("tracker");
                                            // handleDeleteTracker(record.id)
                                        }}
                                    >
                                        {t("delete_tracker")}
                                    </Button>
                                )}
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
                {preferedMap === "google" ? (
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
                        items={trackersList}
                        realTimeTrackersForPolylines={realTimeTrackers.filter((item) => polylinesVisible[item[0].id])}
                        t={t}
                        mapOptions={mapGoogleOptions}
                        setMapOptions={setMapGoogleOptions}
                    />
                ) : preferedMap === "yandex" ? (
                    <GlobalYandexMap
                        height={expandMap ? "calc(100vh - 240px)" : "60vh"}
                        setExpandMap={setExpandMap}
                        items={trackersList}
                        realTimeTrackersForPolylines={realTimeTrackers.filter((item) => polylinesVisible[item[0].id])}
                        t={t}
                    />
                ) : (
                    <GlobalOSMap
                        height={expandMap ? "calc(100vh - 240px)" : "60vh"}
                        setExpandMap={setExpandMap}
                        items={trackersList}
                        t={t}
                        realTimeTrackersForPolylines={realTimeTrackers.filter((item) => polylinesVisible[item[0].id])}
                    />
                )}
            </section>

            {open && (
                <TrackerEditModal
                    t={t}
                    open={open}
                    handleCancel={handleCancel}
                    item={tracker}
                    setItem={setTracker}
                    mode={modalMode}
                    handleSubmit={modalMode === "create" ? handleCreateTracker : handleUpdateTracker}
                />
            )}

            {openSharedModal && (
                <GeneralSharedModal
                    t={t}
                    openSharedModal={openSharedModal}
                    sharedUser={sharedUser}
                    handleCancel={handleCancelShared}
                    handleSubmit={sharedActionMode === "edit" ? handleEditSharedUser : handleAddSharedUser}
                    setSharedUser={setSharedUser}
                    editMode={sharedActionMode === "edit"}
                    mode="trackers"
                />
            )}

            {openDetailsModal && (
                <TrackerDetailsModal
                    t={t}
                    handleCancel={handleCancelDetails}
                    tracker={tracker}
                    open={openDetailsModal}
                    handleOpenPermission={handleOpenPermission}
                    deleteSharedUser={deleteSharedUser}
                    handleOpenSharedUser={handleOpenSharedUser}
                />
            )}

            {openPermissionsModal && (
                <GeneraPermissionsModal
                    handleCancel={handleClosePermissions}
                    openPermissions={openPermissionsModal}
                    t={t}
                    permissions={checkedSharedUser}
                    mode="trackers"
                />
            )}

            {openDeleteModal && (
                <DeleteModal
                    isModalVisible={openDeleteModal}
                    setIsModalVisible={setOpenDeleteModal}
                    submitModal={deleteModalMode === "tracker" ? handleSubmitDeleteTracker : handleSubmitDeleteSharedUser}
                    item={deleteModalMode}
                    t={t}
                />
            )}
        </div>
    );
};

export default React.memo(Trackers);
