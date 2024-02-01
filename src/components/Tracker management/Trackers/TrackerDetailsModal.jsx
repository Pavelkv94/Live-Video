import React, { useEffect } from "react";
import { Button, Modal, Table } from "antd";
import { trackerDetails } from "../../general/initialData";
import { dateConvert, isDateExpired } from "../../../utils/dateConvert";
import { useDispatch, useSelector } from "react-redux";
import "./Trackers.scss";
import { DeleteOutlined, EditOutlined, ShareAltOutlined } from "@ant-design/icons";
import { fetchTrackerSharings } from "../../../redux/trackersReducer";

const TrackerDetailsModal = ({ t, handleCancel, tracker, open, handleOpenPermission, deleteSharedUser, handleOpenSharedUser }) => {
    const dispatch = useDispatch();

    const trackerDetailsItems = Object.entries(trackerDetails);
    const trackerModels = useSelector((state) => state.trackersReducer.trackerModels);
    const trackerSharings = useSelector((state) => state.trackersReducer.trackerSharings);
    const user = useSelector((state) => state.authReducer.user);

    useEffect(() => {
        user.id === tracker.user_id && dispatch(fetchTrackerSharings(tracker.id));
    }, [tracker]);

    const dataShared = trackerSharings?.map((el, i) => ({
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
                    <Button onClick={() => handleOpenPermission(params)}>{t("show_permissions")}</Button>
                </div>
            )
        },
        {
            title: t("actions"),
            dataIndex: "",
            key: "actions",
            render: (el, params) => (
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button icon={<EditOutlined />} onClick={() => handleOpenSharedUser(params)} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => deleteSharedUser(params)} />
                </div>
            )
        }
    ];

    return (
        <Modal
            title={
                <div>
                    {`${t("tracker_details")}: ${tracker.name}`}{" "}
                    {tracker.user_id !== user.id && <ShareAltOutlined style={{ marginLeft: 5 }} />}
                </div>
            }
            className={"modal-wrapper"}
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    {t("close")}
                </Button>
            ]}
            width={600}
        >
            <div className="tracker-details-modal">
                <div className="tracker-details">
                    {trackerDetailsItems.map((el, i) => (
                        <div key={i} className="tracker-details-item">
                            <b>{t(`${el[1]}`)}:</b>
                            <div style={{ marginLeft: 4 }}>
                                {el[1] === "paid_up_to" ? (
                                    <span>
                                        {dateConvert(tracker[el[0]])}
                                        {isDateExpired(tracker.paid_till) && <i style={{ color: "red" }}>({t("expired")})</i>}
                                    </span>
                                ) : el[1] === "tracker_color" ? (
                                    <div className="indicator" style={{ background: tracker[el[0]] }}></div>
                                ) : el[1] === "tracker_model" ? (
                                    trackerModels.find((el) => el.id == tracker.tracker_model_id)?.name || "—"
                                ) : (
                                    tracker[el[0]] || "—"
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {tracker.user_id !== user.id ? (
                    <div>
                        <b>{t("shared_by")}:</b> <i>{tracker.shared_by}</i>
                    </div>
                ) : (
                    <Table pagination={false} bordered columns={columnsShared} dataSource={dataShared} className="tracker-shared" size="small" />
                )}
            </div>
        </Modal>
    );
};

export default TrackerDetailsModal;
