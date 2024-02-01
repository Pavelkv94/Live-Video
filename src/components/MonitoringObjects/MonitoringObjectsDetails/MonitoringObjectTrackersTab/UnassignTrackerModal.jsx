import React, { useEffect, useState } from "react";
import { GeneralModalWrapper } from "../../../general/GeneralModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { fetchTrackers } from "../../../../redux/trackersReducer";
import { unassignMonitoringObjectTracker } from "../../../../redux/monitoringObjectsReducer";

const UnassignTrackerModal = ({ t, open, handleCancel, objId, monitoringObjectTrackers }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.authReducer.user);

    const [checkedTracker, setCheckedTracker] = useState(null);

    useEffect(() => {
        user && dispatch(fetchTrackers(user.user_id));
    }, [user]);

    const handleUnassignTracker = () => {
        dispatch(unassignMonitoringObjectTracker(objId, checkedTracker));
        handleCancel();
    };
    const optionsTrackers = monitoringObjectTrackers.map((el) => ({ value: el.id, label: el.name }));
    const isEmpty = optionsTrackers.length === 0;

    return (
        <GeneralModalWrapper
            t={t}
            title={t("unassign_tracker")}
            open={open}
            action={"unassign"}
            handleSubmit={handleUnassignTracker}
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

export default React.memo(UnassignTrackerModal);
