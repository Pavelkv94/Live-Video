import React, { useEffect, useState } from "react";
import { GeneralModalWrapper } from "../../../general/GeneralModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { fetchTrackers } from "../../../../redux/trackersReducer";
import { assignMonitoringObjectTracker } from "../../../../redux/monitoringObjectsReducer";

const AssignTrackerModal = ({ t, open, handleCancel, objId }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.authReducer.user);
    const trackersList = useSelector((state) => state.trackersReducer.trackersList);
    const monitoringObjectTrackers = useSelector((state) => state.monitoringObjectsReducer.monitoringObjectTrackers);

    const [checkedTracker, setCheckedTracker] = useState(null);

    useEffect(() => {
        user && dispatch(fetchTrackers(user.user_id));
    }, [user]);

    const handleAssignTracker = () => {
        dispatch(assignMonitoringObjectTracker(objId, checkedTracker));
        handleCancel();
    };
    const optionsTrackers = trackersList.filter(el => !el.shared)
        .filter((obj1) => {
            return !monitoringObjectTrackers.find((obj2) => obj1.id === obj2.id);
        })
        .map((el) => ({ value: el.id, label: el.name }));
    const isEmpty = optionsTrackers.length === 0;

    return (
        <GeneralModalWrapper
            t={t}
            title={t("assign_tracker")}
            open={open}
            action={"assign"}
            handleSubmit={handleAssignTracker}
            handleCancel={handleCancel}
            disableButton={isEmpty}
        >
            {isEmpty ? (
                <p>{t("dont_have_free_trackers")}</p>
            ) : (
                <>
                    <label>{t("select_available_trackers")}:</label>
                    <Select
                        allowClear
                        style={{
                            width: "100%"
                        }}
                        placeholder={t("select_tracker")}
                        defaultValue={null}
                        onChange={(value) => setCheckedTracker(value)}
                        options={optionsTrackers}
                    />
                </>
            )}
        </GeneralModalWrapper>
    );
};

export default React.memo(AssignTrackerModal);
