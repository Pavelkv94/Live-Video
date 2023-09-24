import React, { useRef, useState } from "react";
import "./MonitoringObjectDetailsTab.scss";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
    addSharedUser,
    changeAccessLevel,
    deleteMonitoringObject,
    deleteSharedMonitoringObjects,
    updateMonitoringObjectImage
} from "../../../../redux/monitoringObjectsReducer";
import { Button, Card, Table, message } from "antd";
import { initMonitoringObj, initSharedObjectUser } from "../../../general/initialData";
import { DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { DeleteModal } from "../../../general/DeleteModal";
import MonitoringModal from "../../MonitoringModal";
import { updateMonitoringObject } from "../../../../redux/monitoringObjectsReducer";
import defaultImage from "../../../../assets/img/defaultImage.jpg";
import GeneralSharedModal from "../../../general/GeneralSharedModal";
import GeneraPermissionsModal from "../../../general/GeneraPermissionsModal";

const MonitoringObjectDetailsTab = ({ t, monitoringObject, isSharedObject }) => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const avaRef = useRef();
    const navigate = useNavigate();

    const [editObject, setEditObject] = useState(initMonitoringObj);
    const [sharedUser, setSharedUser] = useState(initSharedObjectUser);
    const [openSharedModal, setOpenSharedModal] = useState(false);
    const [openEditObject, setOpenEditObject] = useState(false);
    const [openPermissionsModal, setOpenPermissionsModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [checkedSharedUser, setCheckedSharedUser] = useState(null);
    const [sharedActionMode, setSharedActionMode] = useState("create");
    const [deleteModalMode, setDeleteModalMode] = useState("shared user");

    const handleAddSharedUser = () => {
        dispatch(addSharedUser(id, sharedUser));
        setOpenSharedModal(false);
        setSharedUser(initSharedObjectUser);
    };

    const handleEditSharedUser = () => {
        dispatch(changeAccessLevel(sharedUser.id, sharedUser));
        setOpenSharedModal(false);
    };

    const dataShared = monitoringObject?.shared_to?.map((el) => ({
        ...el,
        key: el.id
    }));

    const handleCancel = () => {
        setOpenSharedModal(false);
        setSharedUser(initSharedObjectUser);
    };

    const handleSubmitDeleteSharedUser = () => {
        dispatch(deleteSharedMonitoringObjects(checkedSharedUser.id));
        setCheckedSharedUser(null);
        setOpenDeleteModal(false);
    };

    const handleSubmitDeleteObject = () => {
        dispatch(deleteMonitoringObject(id));
        setOpenDeleteModal(false);
        navigate("/monitoring");
    };

    const handleCancelEditObject = () => {
        setOpenEditObject(false);
    };

    const handleClosePermissions = () => {
        setOpenPermissionsModal(false);
        setCheckedSharedUser(null);
    };

    const handleEditObject = () => {
        dispatch(updateMonitoringObject(id, { name: editObject.name, description: editObject.description }));
        setEditObject(null);
        setOpenEditObject(false);
    };

    const onImageSelected = (e) => {
        if (e.target.files && e.target.files.length) {
            if (e.target.files[0].size > 3072000) {
                message.error(t("monitoringObjects.imageSizeWarning"));
            } else {
                dispatch(
                    updateMonitoringObjectImage(id, { name: monitoringObject.name, description: monitoringObject.description, picture: e.target.files[0] })
                );
            }
        }
    };

    const columnsShared = [
        {
            title: t("common.userEmail"),
            dataIndex: "email",
            key: "email"
        },
        {
            title: t("common.permissions"),
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
                        {t("common.showPermissions")}
                    </Button>
                </div>
            )
        },
        {
            title: t("common.actions"),
            dataIndex: "",
            key: "actions",
            render: (el, params) => (
                <div className="actions">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSharedActionMode("edit");
                            setSharedUser(monitoringObject.shared_to?.find((el) => el.id === +id));
                            setOpenSharedModal(true);
                            setSharedUser(params);
                        }}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setDeleteModalMode("shared user");
                            setOpenDeleteModal(true);
                            setCheckedSharedUser(params);
                        }}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="monitoring-details-content">
            <Card className="info">
                <div style={{ backgroundImage: `url(${monitoringObject.picture_url || defaultImage})` }} className="object-image"></div>
                <br />
                <br />
                <b>{t("common.name")}:</b>
                <p>{monitoringObject.name}</p>
                <b>{t("common.description")}:</b>
                <p>{monitoringObject.description}</p>
                <div className="flex">
                    {!isSharedObject && (
                        <Button
                            onClick={() => {
                                setEditObject(monitoringObject);
                                setOpenEditObject(true);
                            }}
                        >
                            {t("common.edit")}
                        </Button>
                    )}
                    <section style={{ margin: "0 20px" }}>
                        <div onClick={() => avaRef.current.click()} className="photo-wrap">
                            <Button icon={<UploadOutlined />}>{t("monitoringObjects.updateImage")}</Button>
                        </div>
                        <input type="file" ref={avaRef} style={{ display: "none" }} onChange={onImageSelected} accept="image/jpeg,image/png" />
                    </section>
                    <Button
                        danger
                        onClick={() => {
                            setDeleteModalMode("monitoring object");
                            setOpenDeleteModal(true);
                        }}
                    >
                        {t("monitoringObjects.deleteObject")}
                    </Button>
                </div>
            </Card>
            {!isSharedObject && (
                <Card
                    title={t("monitoringObjects.sharedTo")}
                    extra={
                        !isSharedObject && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    setOpenSharedModal(true);
                                    setSharedActionMode("create");
                                }}
                            >
                                {t("monitoringObjects.addUser")}
                            </Button>
                        )
                    }
                >
                    <Table pagination={false} bordered columns={isSharedObject ? columnsShared.slice(0, 2) : columnsShared} dataSource={dataShared} />
                </Card>
            )}
            {openSharedModal && (
                <GeneralSharedModal
                    t={t}
                    openSharedModal={openSharedModal}
                    sharedUser={sharedUser}
                    handleCancel={handleCancel}
                    handleSubmit={sharedActionMode === "edit" ? handleEditSharedUser : handleAddSharedUser}
                    setSharedUser={setSharedUser}
                    editMode={sharedActionMode === "edit"}
                    mode="monitoringObject"
                />
            )}

            {openEditObject && (
                <MonitoringModal
                    t={t}
                    open={openEditObject}
                    handleCancel={handleCancelEditObject}
                    handleSubmit={handleEditObject}
                    mode={"edit"}
                    item={editObject}
                    setItem={setEditObject}
                />
            )}

            {openDeleteModal && (
                <DeleteModal
                    isModalVisible={openDeleteModal}
                    setIsModalVisible={setOpenDeleteModal}
                    submitModal={deleteModalMode === "shared user" ? handleSubmitDeleteSharedUser : handleSubmitDeleteObject}
                    item={deleteModalMode}
                    t={t}
                />
            )}

            {openPermissionsModal && (
                <GeneraPermissionsModal
                    handleCancel={handleClosePermissions}
                    openPermissions={openPermissionsModal}
                    t={t}
                    permissions={checkedSharedUser}
                    mode="monitoringObject"
                />
            )}
        </div>
    );
};

export default React.memo(MonitoringObjectDetailsTab);
