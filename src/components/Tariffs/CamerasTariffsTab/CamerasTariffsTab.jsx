import React, { useEffect } from "react";
import "./CamerasTariffsTab.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamerasTariffs } from "../../../redux/tariffsReducer";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { tariffCameraDatafields, tariffsCamerasDescriptions } from "../../general/initialData";

const CamerasTariffsTab = ({ t, isMobileSize }) => {
    const dispatch = useDispatch();
    const tariffs = useSelector(state => state.tariffsReducer.camerasTariffsList);


    useEffect(() => {
        dispatch(fetchCamerasTariffs());
    }, [dispatch]);

    const tariffsItems = tariffs.map((el, i) => (
        <div key={i} className="tariffs-item-wrap">
            {tariffCameraDatafields.map((field, key) => (
                <div
                    className="tariffs-item"
                    key={key}
                    style={key === 0 ? { background: "#fafafa", fontWeight: 600, height: 45 } : { height: isMobileSize ? 45 : 51 }}
                >
                    {field.boolean ? (
                        <div>
                            {el[field.name] ? (
                                <CheckCircleOutlined style={{ color: "#0b8235", fontSize: 22 }} />
                            ) : (
                                <CloseCircleOutlined style={{ color: "#f81d22", fontSize: 22 }} />
                            )}
                        </div>
                    ) : (
                        <p>{el[field.name]}</p>
                    )}
                </div>
            ))}
        </div>
    ));

    const tariffsDescriptionsFields = (
        <div className="tariffs-item-wrap">
            {tariffsCamerasDescriptions.map((field, key) => (
                <div
                    className="tariffs-item"
                    key={key}
                    style={
                        key === 0
                            ? { background: "#fafafa", fontWeight: 600, height: 45 }
                            : { justifyContent: "flex-start", minWidth: isMobileSize ? 190 : 350, height: isMobileSize ? 45 : 51 }
                    }
                >
                    <p>{t(field)}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div className="cameras-tariffs">
            <div className="tariffs-content">
                {tariffsDescriptionsFields}
                {tariffsItems}
            </div>
        </div>
    );
};

export default React.memo(CamerasTariffsTab);
