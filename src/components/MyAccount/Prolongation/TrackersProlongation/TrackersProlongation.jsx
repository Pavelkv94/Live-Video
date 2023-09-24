import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSharingTracker, fetchTrackerModels, fetchTrackers, trackerProlongation, updateSharingTracker } from "../../../../redux/trackersReducer";
import { Button, Input, Radio, Select, Table } from "antd";
import { fetchTariffs } from "../../../../redux/tariffsReducer";
import { dateConvert } from "../../../../utils/dateConvert";
import { initSharedTrackerUser, initalTracker, initialProlongTracker } from "../../../general/initialData";
import "./TrackersProlongation.scss";
import TrackerDetailsModal from "../../../Tracker management/Trackers/TrackerDetailsModal";
import GeneralSharedModal from "../../../general/GeneralSharedModal";
import GeneraPermissionsModal from "../../../general/GeneraPermissionsModal";
import { DeleteModal } from "../../../general/DeleteModal";

const TrackersProlongation = ({ t }) => {
    const dispatch = useDispatch();

    const [prolongData, setProlongData] = useState([]);
    const user = useSelector((state) => state.authReducer.user);
    const trackersList = useSelector((state) => state.trackersReducer.trackersList);
    const trackerModels = useSelector((state) => state.trackersReducer.trackerModels);
    const tariffs = useSelector((state) => state.tariffsReducer.tariffsList);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [tracker, setTracker] = useState(initalTracker);
    const [openSharedModal, setOpenSharedModal] = useState(false);
    const [sharedUser, setSharedUser] = useState(initSharedTrackerUser);
    const [sharedTracker, setSharedTracker] = useState(null);
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
        dispatch(fetchTrackers(user.user_id));
        dispatch(fetchTrackerModels());
        dispatch(fetchTariffs());
    }, [dispatch]);

    useEffect(() => {
        trackersList && setProlongData(trackersList.filter((el) => !el.shared).map((el) => ({ id: el.trobject_id, data: initialProlongTracker })));
    }, [trackersList]);

    const handleSelectTariff = (id) => (value) => {
        setProlongData(prolongData.map((el) => (el.id === id ? { ...el, data: { ...el.data, tariff_id: value } } : el)));
    };
    const onChangeMounth = (id) => (e) => {
        setProlongData(prolongData.map((el) => (el.id === id ? { ...el, data: { ...el.data, month_amount: e.target.value } } : el)));
    };

    const prolongTracker = (id) => () => {
        const payload = prolongData.find((el) => el.id === id);
        dispatch(trackerProlongation(id, payload.data, user.user_id));
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
        dispatch(deleteSharingTracker(checkedSharedUser.trobject_id));
        setCheckedSharedUser(null);
        setOpenDeleteModal(false);
    };

    const handleEditSharedUser = () => {
        dispatch(updateSharingTracker(checkedSharedUser.trobject_id, sharedUser));
    };

    const handleCancelShared = () => {
        setOpenSharedModal(false);
        setSharedUser(initSharedTrackerUser);
        setSharedTracker(null);
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

    const options = tariffs.map((el) => ({ label: el.tariffobj_name, value: el.tariffobj_id }));

    const columns = [
        {
            title: t("common.name"),
            dataIndex: "trobject_name",
            key: "trobject_name",
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
            title: t("common.imei"),
            dataIndex: "trobject_imei",
            key: "trobject_imei",
            align: "center"
        },
        {
            title: t("trackerManagement.tr_ref_trmodel"),
            dataIndex: "trobject_ref_trmodel",
            key: "trobject_ref_trmodel",
            align: "center",
            render: (text, params) => trackerModels.find((el) => el.trmodel_id == params.trobject_ref_trmodel)?.trmodel_name || "—"
        },
        {
            title: t("tariffs.tariffobj_name"),
            dataIndex: "trobject_ref_tariffobj",
            key: "trobject_ref_tariffobj",
            align: "center",
            render: (text) => tariffs.find((el) => text === el.tariffobj_id)?.tariffobj_name || "—"
        },
        {
            title: t("trackerManagement.tr_paid"),
            dataIndex: "trobject_oplacheno",
            key: "trobject_oplacheno",
            align: "center",
            render: (text) => (
                <div className={expiredTariff(text) ? "red-cell" : ""}>
                    {dateConvert(text)} {expiredTariff(text) && `(${t("common.expired")})`}
                </div>
            )
        },
        {
            title: t("myAccount.newTariffPlan"),
            dataIndex: "newTariffPlan",
            key: "newTariffPlan",
            align: "center",
            render: (text, params) => (
                <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={prolongData.find((el) => params.trobject_id === el.id)?.data.tariff_id}
                    onChange={handleSelectTariff(params.trobject_id)}
                    options={options}
                />
            )
        },
        {
            title: t("myAccount.payFor"),
            dataIndex: "payFor",
            key: "payFor",
            align: "center",
            render: (text, params) => (
                <Radio.Group onChange={onChangeMounth(params.trobject_id)} value={prolongData.find((el) => params.trobject_id === el.id)?.data.month_amount}>
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
            title: t("myAccount.totalAmount"),
            dataIndex: "pay_action",
            key: "pay_action",
            align: "left",
            render: (text, params) => (
                <div style={{ display: "flex" }}>
                    <Input style={{ width: "100px", marginRight: 20 }} disabled value={"100 BYN"} />
                    <Button
                        type="primary"
                        style={{ background: "#5cb85c", width: 100 }}
                        onClick={prolongTracker(params.trobject_id)}
                        disabled={prolongData.find((el) => params.trobject_id === el.id)?.data.tariff_id}
                    >
                        {t("myAccount.pay")}
                    </Button>
                </div>
            )
        }
    ];
    const data = trackersList.filter((el) => !el.shared).map((el) => ({ ...el, key: el.trobject_id }));

    return (
        <div className="trackers-prolongation">
            <Table columns={columns} dataSource={data} pagination={false} />
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
