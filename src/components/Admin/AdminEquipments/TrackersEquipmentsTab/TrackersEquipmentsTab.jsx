import React, { useEffect, useState } from "react";
import "./TrackersEquipmentsTab.scss";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createTrackerModelAdmin, deleteTrackerModelAdmin, fetchTrackerModelsAdmin, updateTrackerModelAdmin } from "../../../../redux/trackersReducer";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DeleteModal } from "../../../general/DeleteModal";
import TrackerModelModal from "./TrackerModelModal";
import { initTrackerModel } from "../../../general/initialData";

const TrackersEquipmentsTab = ({ t }) => {
    const dispatch = useDispatch();

    const trackersModelsList = useSelector((state) => state.trackersReducer.adminTrackerModels);

    const [openTrackerModelModal, setOpenTrackerModelModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [checkedModel, setCheckedModel] = useState(null);
    const [trackerModelMode, setTrackerModelMode] = useState("create");
    const [trackerModel, setTrackerModel] = useState(initTrackerModel);

    useEffect(() => {
        dispatch(fetchTrackerModelsAdmin());
    }, [dispatch]);

    const columns = [
        {
            title: t("admin.trackerModel"),
            dataIndex: "trmodel_name",
            key: "trmodel_name"
        },
        {
            title: t("common.actions"),
            dataIndex: "actions",
            key: "actions",
            render: (text, params) => (
                <div className="tracker-models-actions">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setOpenTrackerModelModal(true);
                            setTrackerModel(params);
                            setTrackerModelMode("edit");
                        }}
                        style={{ marginRight: 20 }}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => {
                            setOpenDeleteModal(true);
                            setCheckedModel(params);
                        }}
                    />
                </div>
            )
        }
    ];

    const handleSubmitDeleteModal = () => {
        dispatch(deleteTrackerModelAdmin(checkedModel.trmodel_id));
        setCheckedModel(null);
        setOpenDeleteModal(false);
    };

    const handleCancelModal = () => {
        setOpenTrackerModelModal(false);
        setTrackerModel(initTrackerModel);
    };

    const handleEditTrackerModel = () => {
        dispatch(updateTrackerModelAdmin(trackerModel.trmodel_id, { trmodel_name: trackerModel.trmodel_name, trmodel_code: trackerModel.trmodel_code }));
        handleCancelModal();
    };

    const handleCreateTrackerModel = () => {
        dispatch(createTrackerModelAdmin({ trmodel_name: trackerModel.trmodel_name, trmodel_code: trackerModel.trmodel_code }));
        handleCancelModal();
    };

    const data = trackersModelsList.map((el) => ({
        ...el,
        key: el?.trmodel_id
    }));

    return (
        <div className="trackers-equipments">
            <Button
                type="primary"
                onClick={() => {
                    setTrackerModelMode("create");
                    setOpenTrackerModelModal(true);
                }}
                style={{ marginBottom: 20 }}
            >
                {t("admin.addtrackerModel")}
            </Button>
            <Table className="trackers-models" dataSource={data} columns={columns} pagination={false} size="small" />

            {openDeleteModal && (
                <DeleteModal
                    isModalVisible={openDeleteModal}
                    setIsModalVisible={setOpenDeleteModal}
                    submitModal={handleSubmitDeleteModal}
                    item="tracker model"
                    t={t}
                />
            )}
            {openTrackerModelModal && (
                <TrackerModelModal
                    open={openTrackerModelModal}
                    item={trackerModel}
                    handleCancel={handleCancelModal}
                    handleSubmit={trackerModelMode === "edit" ? handleEditTrackerModel : handleCreateTrackerModel}
                    setItem={setTrackerModel}
                    mode={trackerModelMode}
                    t={t}
                />
            )}
        </div>
    );
};

export default React.memo(TrackersEquipmentsTab);
