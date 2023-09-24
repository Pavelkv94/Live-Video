import React, { useEffect, useState } from "react";
import "./Trackers.scss";
import { Button, Checkbox, Popover, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    addSharingTracker,
    changeTrackerVisibleAC,
    createTracker,
    deleteSharingTracker,
    deleteTracker,
    fetchTrackerModels,
    fetchTrackers,
    updateSharingTracker,
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
import { fetchTariffs } from "../../../redux/tariffsReducer";
import GeneralSharedModal from "../../general/GeneralSharedModal";
import TrackerDetailsModal from "./TrackerDetailsModal";
import GeneraPermissionsModal from "../../general/GeneraPermissionsModal";
import { DeleteModal } from "../../general/DeleteModal";

const Trackers = ({ t }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const trackersList = useSelector((state) => state.trackersReducer.trackersList);

    const [open, setOpen] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    const [tracker, setTracker] = useState(initalTracker);
    const [expandMap, setExpandMap] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    // const [trackersList, setTrackerList] = useState([]); //fake
    const [realTimeTrackers, setRealTimeTrackers] = useState([]);
    const [mapGoogleOptions, setMapGoogleOptions] = useState(initGoogleOptions);
    const [openSharedModal, setOpenSharedModal] = useState(false);
    const [sharedUser, setSharedUser] = useState(initSharedTrackerUser);
    const [sharedTracker, setSharedTracker] = useState(null);
    const [openPermissionsModal, setOpenPermissionsModal] = useState(false);
    const [checkedSharedUser, setCheckedSharedUser] = useState(null);
    const [sharedActionMode, setSharedActionMode] = useState("create");

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteModalMode, setDeleteModalMode] = useState("shared user");
    //! не меняется при смене карты
    useEffect(() => {
        setTimeout(() => {
            setMapGoogleOptions({ ...mapGoogleOptions, zoom: 12 });
        }, 300);
    }, []);

    // console.log(sharedUser);
    // useEffect(() => {
    //     fetch("http://localhost:5000/trackers", {
    //         method: "GET"
    //     })
    //         .then((res) => res.json())
    //         .then((resp) => setTrackerList(resp));
    // }, []);

    // useEffect(() => {
    //     let intervalId;
    //     if (realTimeTrackers.length > 0) {
    //         intervalId = setInterval(() => {
    //             fetch("http://localhost:5000/trackers", {
    //                 method: "GET"
    //             })
    //                 .then((res) => res.json())
    //                 .then((response) => {
    //                     setRealTimeTrackers(
    //                         realTimeTrackers.map((arr) => {
    //                             const mergedArr = [
    //                                 ...arr,
    //                                 ...response
    //                                     .filter((obj) => obj.trobject_id === arr[0].id)
    //                                     .map((el) => ({ id: el.trobject_id, lat: el.trobject_latitude, lng: el.trobject_longitude, color: el.color }))
    //                             ];
    //                             return mergedArr;
    //                         })
    //                     );

    //                     setTrackerList(
    //                         trackersList.map((obj1) => {
    //                             const obj2 = response.find((obj2) => obj2.trobject_id === obj1.trobject_id);
    //                             return obj2 && realTimeTrackers.find((el) => el[0].id === obj1.trobject_id) ? { ...obj1, ...obj2 } : obj1;
    //                         })
    //                     );
    //                 });
    //         }, 6000);
    //     }
    //     // eslint-disable-next-line no-console
    //     console.log("request every 10 sec");

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [realTimeTrackers]);

    useEffect(() => {
        dispatch(fetchTrackers(user.user_id));
        dispatch(fetchTrackerModels());
        dispatch(fetchTariffs());
    }, [dispatch]);

    const openEditModal = (data) => () => {
        setTracker(data);
        setModalMode("edit");
        setOpen(true);
    };

    const handleChangeVisible = (tracker_id) => (e) => {
        dispatch(changeTrackerVisibleAC(tracker_id, e.target.checked));
    };
    // console.log(realTimeTrackers);
    const handleChangeRealtimeTracker = (tracker) => (e) => {
        if (e.target.checked) {
            setRealTimeTrackers([
                ...realTimeTrackers,
                [{ id: tracker.trobject_id, lat: tracker.trobject_latitude, lng: tracker.trobject_longitude, color: tracker.color }]
            ]);
        } else {
            setRealTimeTrackers(realTimeTrackers.filter((el) => el[0].id !== tracker.trobject_id));
        }
    };

    const handleCancelShared = () => {
        setOpenSharedModal(false);
        setSharedUser(initSharedTrackerUser);
        setSharedTracker(null);
    };

    const handleAddSharedUser = () => {
        dispatch(addSharingTracker(sharedTracker, sharedUser));
        handleCancelShared();
    };

    const handleChangeVisiblePolylines = (tracker) => (e) => {
        if (e.target.checked) {
            setRealTimeTrackers([]);
        }
        // eslint-disable-next-line no-console
        console.log(tracker);
    };

    const preferedMapOptions = [
        { value: "google", label: t("common.google") },
        { value: "yandex", label: t("common.yandex") },
        { value: "osm", label: t("common.osm") }
    ];

    const visiblePopup = <div>{t("trackerManagement.visibleOnMap")}</div>;
    const movementPopup = <div>{t("trackerManagement.movementOnMap")}</div>;
    const visiblePolylinesPopup = <div>{t("trackerManagement.visiblePolylines")}</div>;

    const columns = [
        {
            title: t("common.name"),
            dataIndex: "trobject_name",
            key: "name",
            render: (text, params) => (
                <div style={{ display: "flex" }}>
                    <span
                        style={isDateExpired(params.trobject_oplacheno) ? {} : { color: "#1677ff", cursor: "pointer" }}
                        onClick={() =>
                            setMapGoogleOptions({
                                center: { lat: params.trobject_latitude, lng: params.trobject_longitude },
                                zoom: 18
                            })
                        }
                    >
                        {text} {isDateExpired(params.trobject_oplacheno) && <i style={{ color: "red" }}>({t("common.expired")})</i>}
                    </span>
                    {params.shared && <ShareAltOutlined style={{ marginLeft: 5 }} />}
                </div>
            )
        },
        {
            title: t("common.regDate"),
            dataIndex: "trobject_regtime",
            key: "trobject_regtime",
            render: (text) => <p style={{ width: "120px" }}>{text}</p>
        },
        {
            title: t("common.speed"),
            dataIndex: "trobject_speed",
            key: "Speed",
            align: "center",
            render: (text) => (
                <div>
                    {text} {t("common.kmh")}
                </div>
            )
        },
        {
            title: t("common.visible"),
            dataIndex: "visible",
            key: "visible",
            render: (text, params) => (
                <div className="flex">
                    <div className="indicator" style={{ background: params.color }}></div>
                    <Popover content={visiblePopup}>
                        <Checkbox
                            onChange={handleChangeVisible(params.trobject_id)}
                            checked={params.isVisibleOnMap}
                        ></Checkbox>
                    </Popover>
                    <Popover content={movementPopup}>
                        <Checkbox
                            style={{ marginLeft: "10px" }}
                            onChange={handleChangeRealtimeTracker(params)}
                            disabled={isDateExpired(params.trobject_oplacheno)}
                        ></Checkbox>
                    </Popover>
                    <Popover content={visiblePolylinesPopup}>
                        <Checkbox
                            style={{ marginLeft: "10px" }}
                            onChange={handleChangeVisiblePolylines(params)}
                            disabled={isDateExpired(params.trobject_oplacheno)}
                        ></Checkbox>
                    </Popover>
                </div>
            )
        }
    ];

    const data = trackersList.map((el) => ({
        ...el,
        key: el.trobject_id,
        trobject_regtime: dateConvert(el.trobject_regtime)
    }));

    const handleCreateTracker = () => {
        dispatch(createTracker(user.user_id, { ...tracker, trobject_ref_tariffobj: 5 }));
        setTracker(initalTracker);
        setOpen(false);
    };

    const handleUpdateTracker = () => {
        dispatch(
            updateTracker(
                tracker.trobject_id,
                {
                    trobject_name: tracker.trobject_name,
                    trobject_imei: tracker.trobject_imei,
                    trobject_phone: tracker.trobject_phone,
                    trobject_public: tracker.trobject_public,
                    trobject_info: tracker.trobject_info,
                    trobject_srrashod: tracker.trobject_srrashod,
                    trobject_ref_trmodel: tracker.trobject_ref_trmodel,
                    trobject_timestop: tracker.trobject_timestop,
                    trobject_timepark: tracker.trobject_timepark,
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

    const handleDeleteTracker = (tracker_id) => () => {
        dispatch(deleteTracker(tracker_id));
    };

    const changeMap = (value) => dispatch(updateUser(user.user_id, { prefered_map: value }));

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
        dispatch(deleteSharingTracker(checkedSharedUser.trobject_id));
        setCheckedSharedUser(null);
        setOpenDeleteModal(false);
    };

    const handleSubmitDeleteTracker = () => {
        dispatch(deleteTracker(tracker.tracker_id));
        setOpenDeleteModal(false);
        setTracker(null);
    };

    const handleEditSharedUser = () => {
        dispatch(updateSharingTracker( checkedSharedUser.trobject_id, sharedUser));
    };

    const handleOpenSharedUser = (user) => {
        setOpenSharedModal(true);
        setCheckedSharedUser(user);
        setSharedUser(user);
        setSharedActionMode("edit");
    };

    return (
        <div className="trackers">
            <section className="head-section">
                <div className="head-section-title">
                    <h2>{t("menuBar.trackers")}</h2>
                    <Button
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setModalMode("create");
                            setOpen(true);
                        }}
                    />
                </div>
                <div>
                    <Button onClick={() => setRealTimeTrackers([])}>{t("trackerManagement.clearMap")}</Button>
                    <Button
                        style={{ marginRight: 20 }}
                        onClick={
                            () =>
                                // fetch("http://localhost:5000/trackers", {
                                //     method: "GET"
                                // }).then((res) => res.json())
                            // .then((resp) => setTrackerList(resp))
                                dispatch(fetchTrackers(user.user_id)) //! REAL DATA
                        }
                    >
                        {t("trackerManagement.refreshMap")}
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
                                    {t("common.showInfo")}
                                </Button>

                                {!record.shared && <Button icon={<EditOutlined />} onClick={openEditModal(record)}>
                                    {t("common.edit")}
                                </Button>}
                                {!record.shared && (
                                    <Button
                                        icon={<ShareAltOutlined />}
                                        onClick={() => {
                                            setSharedActionMode("create");
                                            setSharedTracker(record.trobject_id);
                                            setOpenSharedModal(true);
                                        }}
                                    >
                                        {t("common.share")}
                                    </Button>
                                )}
                                {!record.shared && <Button danger icon={<DeleteOutlined />} onClick={() => {
                                                                        setTracker(record);
                                    setOpenDeleteModal(true);
                                    setDeleteModalMode("tracker");

                                    // handleDeleteTracker(record.trobject_id)
                                }
                                }>
                                    {t("trackerManagement.deleteTracker")}
                                </Button>}
                            </div>
                        ),
                        rowExpandable: (record) => record.name !== "Not Expandable"
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={data.length > 9}
                    className="trackers-table"
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
                        items={trackersList}
                        realTimeTrackers={realTimeTrackers}
                        t={t}
                        mapOptions={mapGoogleOptions}
                        setMapOptions={setMapGoogleOptions}
                    />
                ) : user.prefered_map === "yandex" ? (
                    <GlobalYandexMap
                        height={expandMap ? "calc(100vh - 240px)" : "60vh"}
                        setExpandMap={setExpandMap}
                        items={trackersList}
                        realTimeTrackers={realTimeTrackers}
                        t={t}
                    />
                ) : (
                    <GlobalOSMap height={expandMap ? "calc(100vh - 240px)" : "60vh"} setExpandMap={setExpandMap} items={trackersList} t={t} />
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
