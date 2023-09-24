import React, { useEffect, useState } from "react";
import { GeneralModalWrapper } from "../../../general/GeneralModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCameras } from "../../../../redux/camerasReducer";
import { Select } from "antd";
import { assignMonitoringObjectCameras } from "../../../../redux/monitoringObjectsReducer";

const AssignCameraModal = ({ t, open, handleCancel, objId }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.authReducer.user);
    const camerasList = useSelector((state) => state.camerasReducer.camerasList);
    const monitoringObjectCameras = useSelector((state) => state.monitoringObjectsReducer.monitoringObjectCameras);

    const [checkedCamera, setCheckedCamera] = useState(null);

    useEffect(() => {
        user && dispatch(fetchCameras(user.user_id));
    }, [user]);

    const handleAssignCamera = () => {
        dispatch(assignMonitoringObjectCameras(objId, checkedCamera));
        handleCancel();
    };

    const optionsCameras = camerasList
        .filter((obj1) => {
            return !monitoringObjectCameras.find((obj2) => obj1.id === obj2.id);
        })
        .filter((el) => !el.shared)
        .map((el) => ({ value: el.id, label: el.name }));
    const isEmpty = optionsCameras.length === 0;

    return (
        <GeneralModalWrapper
            t={t}
            title={t("onlineCameras.assignCamera")}
            open={open}
            action={"assign"}
            handleSubmit={handleAssignCamera}
            handleCancel={handleCancel}
            disableButton={isEmpty}
        >
            {isEmpty ? (
                <p>{t("onlineCameras.dontHaveFreeCameras")}</p>
            ) : (
                <>
                    <label>{t("onlineCameras.selectAvailableCameras")}:</label>
                    <Select
                        allowClear
                        style={{
                            width: "100%"
                        }}
                        placeholder={t("common.selectCamera")}
                        defaultValue={null}
                        onChange={(value) => setCheckedCamera(value)}
                        options={optionsCameras}
                    />
                </>
            )}
        </GeneralModalWrapper>
    );
};

export default React.memo(AssignCameraModal);
