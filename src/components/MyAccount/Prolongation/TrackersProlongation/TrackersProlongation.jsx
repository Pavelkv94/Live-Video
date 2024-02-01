import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSharingTracker, fetchTrackerModels, fetchTrackers, trackerProlongation } from "../../../../redux/trackersReducer";
import { Button, Input, Radio, Select, Table } from "antd";
import { fetchTrackersTariffs } from "../../../../redux/tariffsReducer";
import { dateConvert } from "../../../../utils/dateConvert";
import { initSharedTrackerUser, initalTracker, initialProlongTracker } from "../../../general/initialData";
import "./TrackersProlongation.scss";
import TrackerDetailsModal from "../../../Tracker management/Trackers/TrackerDetailsModal";
import GeneralSharedModal from "../../../general/GeneralSharedModal";
import GeneraPermissionsModal from "../../../general/GeneraPermissionsModal";
import { DeleteModal } from "../../../general/DeleteModal";

const TrackersProlongation = ({ t, isMobileSize }) => {
    const dispatch = useDispatch();

    const [prolongData, setProlongData] = useState([]);
    const user = useSelector((state) => state.authReducer.user);
    const trackersList = useSelector((state) => state.trackersReducer.trackersList);
    const trackerModels = useSelector((state) => state.trackersReducer.trackerModels);
    const tariffs = useSelector((state) => state.tariffsReducer.trackersTariffsList);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [tracker, setTracker] = useState(initalTracker);
    const [openSharedModal, setOpenSharedModal] = useState(false);
    const [sharedUser, setSharedUser] = useState(initSharedTrackerUser);
    const [openPermissionsModal, setOpenPermissionsModal] = useState(false);
    const [checkedSharedUser, setCheckedSharedUser] = useState(null);
    const [sharedActionMode, setSharedActionMode] = useState("create");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteModalMode, setDeleteModalMode] = useState("shared user");

    const handleCancelDetails = () => {
        setOpenDetailsModal(false);
        setTracker(initalTracker);
    };

    useEffect(() => {
        dispatch(fetchTrackers(user.id));
        dispatch(fetchTrackerModels());
        dispatch(fetchTrackersTariffs());
    }, [dispatch]);

    useEffect(() => {
        trackersList && setProlongData(trackersList.filter((el) => !el.shared).map((el) => ({...initialProlongTracker, tracker_id: el.id})));
    }, [trackersList]);

    const handleSelectTariff = (id) => (value) => {
        setProlongData(prolongData.map((el) => (el.tracker_id === id ? { ...el, tracker_tariff_id: value } : el)));
    };
    const onChangeMounth = (id) => (e) => {
        setProlongData(prolongData.map((el) => el.tracker_id === id ? ({ ...el, month_amount: e.target.value }) : el));
    };

    const prolongTracker = (id) => () => {
        const payload = prolongData.find((el) => el.tracker_id === id);
        dispatch(trackerProlongation(id, payload, user.id));
    };

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
        dispatch(deleteSharingTracker(checkedSharedUser.id));
        setCheckedSharedUser(null);
        setOpenDeleteModal(false);
    };

    const handleEditSharedUser = () => {
        // dispatch(updateSharingTracker(checkedSharedUser.id, sharedUser));
    };

    const handleCancelShared = () => {
        setOpenSharedModal(false);
        setSharedUser(initSharedTrackerUser);
    };

    const handleOpenSharedUser = (user) => {
        setOpenSharedModal(true);
        setCheckedSharedUser(user);
        setSharedUser(user);
        setSharedActionMode("edit");
    };

    const expiredTariff = (date) => {
        const currentDate = new Date();
        const paidDate = new Date(date);
        return currentDate - paidDate > 0;
    };

    const options = tariffs.map((el) => ({ label: el.name, value: el.id }));

    const columns = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            align: "center",
            render: (text, record) => (
                <span
                    style={{ cursor: "pointer", color: "#1677ff" }}
                    onClick={() => {
                        setOpenDetailsModal(true);
                        setTracker(record);
                    }}
                >
                    {text}
                </span>
            )
        },
        {
            title: t("imei"),
            dataIndex: "imei",
            key: "imei",
            align: "center"
        },
        {
            title: t("model"),
            dataIndex: "tracker_model_id",
            key: "tracker_model_id",
            align: "center",
            render: (text, params) => trackerModels.find((el) => el.id == params.tracker_model_id)?.name || "—"
        },
        {
            title: t("tariff_name"),
            dataIndex: "tracker_tariff_id",
            key: "tracker_tariff_id",
            align: "center",
            render: (text) => tariffs.find((el) => text === el.id)?.name || "—"
        },
        {
            title: t("paid_up_to"),
            dataIndex: "paid_till",
            key: "paid_till",
            align: "center",
            render: (text) => (
                <div className={expiredTariff(text) ? "red-cell" : ""}>
                    {dateConvert(text)} {expiredTariff(text) && `(${t("expired")})`}
                </div>
            )
        },
        {
            title: t("new_tariff_plan"),
            dataIndex: "new_tariff_plan",
            key: "new_tariff_plan",
            align: "center",
            render: (text, params) => (
                <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={prolongData.find((el) => params.id === el.tracker_id)?.tracker_tariff_id}
                    onChange={handleSelectTariff(params.id)}
                    options={options}
                />
            )
        },
        {
            title: t("pay_for"),
            dataIndex: "pay_for",
            key: "pay_for",
            align: "center",
            render: (text, params) => (
                <Radio.Group onChange={onChangeMounth(params.id)} value={prolongData.find((el) => params.id === el.tracker_id)?.month_amount}>
                    <Radio value={1} className="radio-pay">
                        1 M
                    </Radio>
                    <Radio value={3} className="radio-pay">
                        3 M
                    </Radio>
                    <Radio value={6} className="radio-pay">
                        6 M
                    </Radio>
                    <Radio value={12} className="radio-pay">
                        1 Y
                    </Radio>
                </Radio.Group>
            )
        },
        {
            title: t("total_amount"),
            dataIndex: "pay_action",
            key: "pay_action",
            align: "left",
            render: (text, params) => (
                <div style={{ display: "flex" }}>
                    <Input style={{ width: "100px", marginRight: 20 }} disabled value={"100 BYN"} />
                    <Button
                        type="primary"
                        style={{ background: "#5cb85c", width: 100 }}
                        onClick={prolongTracker(params.id)}
                        disabled={!prolongData.find((el) => params.id === el.tracker_id)?.tracker_tariff_id}
                    >
                        {t("pay")}
                    </Button>
                </div>
            )
        }
    ];
    const data = trackersList.filter((el) => !el.shared).map((el) => ({ ...el, key: el.id }));

    return (
        <div className="trackers-prolongation">
            <Table columns={columns} dataSource={data} pagination={false} size={isMobileSize ? "small" : "middle"}/>
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

            {openSharedModal && (
                <GeneralSharedModal
                    t={t}
                    openSharedModal={openSharedModal}
                    sharedUser={sharedUser}
                    handleCancel={handleCancelShared}
                    handleSubmit={handleEditSharedUser}
                    setSharedUser={setSharedUser}
                    editMode={sharedActionMode === "edit"}
                    mode="trackers"
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
                    submitModal={handleSubmitDeleteSharedUser}
                    item={deleteModalMode}
                    t={t}
                />
            )}
        </div>
    );
};

export default React.memo(TrackersProlongation);
