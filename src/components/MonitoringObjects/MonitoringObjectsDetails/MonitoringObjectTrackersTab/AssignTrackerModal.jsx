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
            return !monitoringObjectTrackers.find((obj2) => obj1.trobject_id === obj2.trobject_id);
        })
        .map((el) => ({ value: el.trobject_id, label: el.trobject_name }));
    const isEmpty = optionsTrackers.length === 0;

    return (
        <GeneralModalWrapper
            t={t}
            title={t("trackerManagement.assignTracker")}
            open={open}
            action={"assign"}
            handleSubmit={handleAssignTracker}
            handleCancel={handleCancel}
            disableButton={isEmpty}
        >
            {isEmpty ? (
                <p>{t("trackerManagement.dontHaveFreeTrackers")}</p>
            ) : (
                <>
                    <label>{t("trackerManagement.selectAvailableTrackers")}:</label>
                    <Select
                        allowClear
                        style={{
                            width: "100%"
                        }}
                        placeholder={t("common.selectTracker")}
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
