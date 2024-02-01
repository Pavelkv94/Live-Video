import { Button, Card, Divider, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCameraSharing, deleteCamera, deleteCameraSharing, fetchCameraSharings, updateCamera } from "../../../../redux/camerasReducer";
import { dateConvert, isDateExpired } from "../../../../utils/dateConvert";
import { DeleteModal } from "../../../general/DeleteModal";
import "./LiveTab.scss";
import { useNavigate } from "react-router";
import { initSharedCameraUser, initialCamera } from "../../../general/initialData";
import CameraModal from "../../CamerasList/CameraModal";
import GeneralSharedModal from "../../../general/GeneralSharedModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import GeneraPermissionsModal from "../../../general/GeneraPermissionsModal";

export const LiveTab = ({ currentCamera, setTab, t, isMobileSize }) => {
    // const currentCamera = mockCameras[0];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const canvas = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [openEditCamera, setOpenEditCamera] = useState(false);
    const [cameraData, setCameraData] = useState(initialCamera);
    const [openSharedModal, setOpenSharedModal] = useState(false);
    const [openPermissionsModal, setOpenPermissionsModal] = useState(false);
    const [sharedUser, setSharedUser] = useState(initSharedCameraUser);
    const [sharedCamera, setSharedCamera] = useState(null);
    const [checkedSharedUser, setCheckedSharedUser] = useState(null);
    const [deleteModalMode, setDeleteModalMode] = useState("shared user");
    const [sharedEditMode, setSharedEditMode] = useState(false);

    const storage = useSelector((state) => state.storagesReducer.currentStorage);
    const bucket = useSelector((state) => state.storagesReducer.currentBucket);
    const cameraSharings = useSelector((state) => state.camerasReducer.cameraSharings);
    const user = useSelector((state) => state.authReducer.user);

    useEffect(() => {
        currentCamera && setCameraData(currentCamera);
        currentCamera.user_id === user.id && currentCamera.id && dispatch(fetchCameraSharings(currentCamera.id));
    }, [currentCamera]);

    // useEffect(() => {
    //     if (!canvas.current) throw new Error('Ref is null');

    //     loadPlayer({
    //       url: 'ws://localhost:2000/api/stream',
    //       canvas: canvas.current,
    //     });
    //   }, []);

    const handleEditCamera = () => {
        dispatch(
            updateCamera(
                {
                    ip_address: cameraData.ip_address,
                    login: cameraData.login,
                    password: cameraData.password,
                    name: cameraData.name,
                    storage_id: cameraData.storage_id,
                    bucket_id: cameraData.bucket_id
                },
                cameraData.id
            )
        );
        setOpenEditCamera(false);
    };

    const handleCancelCreateCamera = () => {
        setOpenEditCamera(false);
        setCameraData(initialCamera);
    };

    const handleSubmitDeleteModal = () => {
        dispatch(deleteCamera(currentCamera.id));
        setIsModalVisible(false);
        navigate("/cameras");
    };

    const handleSubmitDeleteSharedModal = () => {
        dispatch(deleteCameraSharing(sharedUser.camera_id, sharedUser.id));
        setIsModalVisible(false);
    };

    const handleCancelShared = () => {
        setOpenSharedModal(false);
        setSharedUser(initSharedCameraUser);
        setSharedCamera(null);
    };

    const handleAddSharedUser = () => {
        dispatch(addCameraSharing(sharedCamera, { email: sharedUser.email, camera_id: sharedCamera, permissions: {edit: sharedUser.edit} }));
        handleCancelShared();
    };

    const handleEditSharedUser = () => {
        //! будет на бэке позже
        // dispatch(
        // updateCameraSharing(
        //         {
        //             schedules_access: sharedUser.schedules_access,
        //             storage_access: sharedUser.storage_access,
        //             broadcast_access: sharedUser.broadcast_access,
        //             change_access: sharedUser.change_access,
        //             recorded_videos_manage_access: sharedUser.recorded_videos_manage_access
        //         },
        //         sharedUser.id
        // )
        // );
        handleCancelShared();
    };

    const handleClosePermissions = () => {
        setOpenPermissionsModal(false);
        setCheckedSharedUser(null);
    };

    const paramsData = [
        { title: `${t("ip")}:`, value: currentCamera.ip_address || "—" },
        { title: `${t("model")}:`, value: currentCamera.model || "—" },
        // { title: "MAC Address: ", value: currentCamera.mac_address || "—" },
        { title: `${t("login")}:`, value: currentCamera.login || "—" },
        { title: `${t("password")}:`, value: currentCamera.password || "—" },
        // { title: "Serial Number: ", value: currentCamera.serial_number || "—" },
        // { title: `${t("status")}:`, value: currentCamera.status || "—" },
        {
            title: `${t("created")}:`,
            value: dateConvert(currentCamera.created_at) || "—"
        },
        {
            title: `${t("paid_up_to")}:`,
            value: dateConvert(currentCamera.paid_till) || "—"
        },
        { title: `${t("storage")}:`, value: storage ? storage.name : "—" },
        { title: `${t("bucket")}:`, value: bucket ? bucket.name : "—" }
    ];

    const params = paramsData.map((el, index) => (
        <span key={index} className="params-row">
            <p>{el.title}</p>
            <p>
                {el.value}
                {el.title === "Paid up to:" && isDateExpired(currentCamera.paid_till) && <i style={{ color: "red" }}>{` (${t("expired")})`}</i>}
            </p>
        </span>
    ));

    const dataShared = cameraSharings?.map((el, i) => ({
        ...el,
        key: i
    }));

    const columnsShared = [
        {
            title: t("user_email"),
            dataIndex: "email",
            key: "email"
        },
        {
            title: t("permissions"),
            dataIndex: "permissions",
            key: "permissions",
            render: (el, params) => (
                <div>
                    <Button
                        onClick={() => {
                            setOpenPermissionsModal(true);
                            setCheckedSharedUser(params);
                        }}
                    >
                        {t("show_permissions")}
                    </Button>
                </div>
            )
        },
        {
            title: t("actions"),
            dataIndex: "",
            key: "actions",
            render: (el, params) => (
                <div className="actions">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSharedEditMode(true);
                            setOpenSharedModal(true);
                            setSharedUser(params);
                        }}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setDeleteModalMode("shared user");
                            setIsModalVisible(true);
                            setSharedUser(params);
                        }}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="live-tab">
            <div className="camera-details">
                <section>
                    <canvas ref={canvas} className="live" />
                    {/* <video src="" controls poster="https://i.ibb.co/41Swcx3/2023-06-15-10-17.png"></video> */}
                </section>
                <section>
                    {params}
                    <div className="camera-actions">
                        <Button type="dashed" onClick={() => setOpenEditCamera(true)}>
                            {t("edit_camera")}
                        </Button>
                        {/* <Button
                            onClick={() => {
                                setSharedCamera(currentCamera.id);
                                setOpenSharedModal(true);
                            }}
                        >
                            {t("share")}
                        </Button> */}
                        <Button onClick={() => setTab("2")}>Set Schedules</Button>
                        {currentCamera.user_id === user.id && (
                            <Button
                                onClick={() => {
                                    setDeleteModalMode("camera");
                                    setIsModalVisible(true);
                                }}
                                danger
                                type="primary"
                            >
                                {t("delete_camera")}{" "}
                            </Button>
                        )}
                    </div>
                </section>
            </div>
            <Divider />
            {currentCamera.user_id === user.id && (
                <div className="camera-details-second-block">
                    <section></section>
                    <section>
                        <Card
                            title={t("shared_to")}
                            extra={
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setSharedEditMode(false);
                                        setSharedCamera(currentCamera.id);
                                        setOpenSharedModal(true);
                                    }}
                                >
                                    {t("add_user")}
                                </Button>
                            }
                        >
                            <Table pagination={false} bordered columns={columnsShared} dataSource={dataShared} size={isMobileSize ? "small" : "middle"} />
                        </Card>
                    </section>
                </div>
            )}

            {openEditCamera && (
                <CameraModal
                    t={t}
                    open={openEditCamera}
                    handleCancel={handleCancelCreateCamera}
                    item={cameraData}
                    setItem={setCameraData}
                    mode={"edit"}
                    handleSubmit={handleEditCamera}
                />
            )}
            {isModalVisible && (
                <DeleteModal
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    submitModal={deleteModalMode === "shared user" ? handleSubmitDeleteSharedModal : handleSubmitDeleteModal}
                    item={deleteModalMode}
                    t={t}
                />
            )}

            {openSharedModal && (
                <GeneralSharedModal
                    t={t}
                    openSharedModal={openSharedModal}
                    sharedUser={sharedUser}
                    handleCancel={handleCancelShared}
                    handleSubmit={sharedEditMode ? handleEditSharedUser : handleAddSharedUser}
                    setSharedUser={setSharedUser}
                    editMode={sharedEditMode}
                    mode="cameras"
                />
            )}

            {openPermissionsModal && (
                <GeneraPermissionsModal
                    handleCancel={handleClosePermissions}
                    openPermissions={openPermissionsModal}
                    t={t}
                    permissions={checkedSharedUser}
                    mode="cameras"
                />
            )}
        </div>
    );
};
