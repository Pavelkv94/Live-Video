import React from "react";
import { Button, Modal, Table } from "antd";
import { trackerDetails } from "../../general/initialData";
import { dateConvert } from "../../../utils/dateConvert";
import { useSelector } from "react-redux";
import "./Trackers.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const TrackerDetailsModal = ({ t, handleCancel, tracker, open, handleOpenPermission, deleteSharedUser, handleOpenSharedUser }) => {
    const trackerDetailsItems = Object.entries(trackerDetails);
    const trackerModels = useSelector((state) => state.trackersReducer.trackerModels);

    const dataShared = tracker?.shared_to?.map((el) => ({
        ...el,
        key: el.id
    }));

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
                        onClick={() => handleOpenPermission(params)}
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
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleOpenSharedUser(params)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => deleteSharedUser(params)}
                    />
                </div>
            )
        }
    ];

    return (
        <Modal
            title={`${t("trackerManagement.trackerDetails")}: ${tracker.trobject_name}`}
            className={"modal-wrapper"}
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    {t("common.close")}
                </Button>
            ]}
            width={600}
        >
            <div className="tracker-details-modal">
                <div className="tracker-details">
                    {trackerDetailsItems.map((el, i) => (
                        <div key={i} className="tracker-details-item">
                            <b>{t(`trackerManagement.${el[1]}`)}:</b>
                            <div style={{ marginLeft: 4 }}>
                                {el[1] === "tr_paid" ? (
                                    dateConvert(tracker[el[0]])
                                ) : el[1] === "trackerColor" ? (
                                    <div className="indicator" style={{ background: tracker[el[0]] }}></div>
                                ) : el[1] === "tr_ref_trmodel" ? (
                                    trackerModels.find((el) => el.trmodel_id == tracker.trobject_ref_trmodel)?.trmodel_name || "—"
                                ) : el[1] === "tr_public" ? (
                                    t(`common.${tracker[el[0]] ? "yes" : "no"}`)
                                ) : (
                                    tracker[el[0]] || "—"
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {!tracker.shared && (
                    <Table pagination={false} bordered columns={columnsShared} dataSource={dataShared} className="tracker-shared" size="small" />
                )}
            </div>
        </Modal>
    );
};

export default TrackerDetailsModal;
