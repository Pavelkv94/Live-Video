import React, { useEffect } from "react";
import "./TrackersTariffsTab.scss";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { fetchTrackersTariffs } from "../../../redux/tariffsReducer";
import { tariffTrackerDatafields, tariffsTrackersDescriptions } from "../../general/initialData";

const TrackersTariffsTab = ({ t, isMobileSize }) => {
    const dispatch = useDispatch();

    const tariffs = useSelector(state => state.tariffsReducer.trackersTariffsList);

    useEffect(() => {
        dispatch(fetchTrackersTariffs());
    }, [dispatch]);

    const tariffsItems = tariffs.map((el, i) => (
        <div key={i} className="tariffs-item-wrap">
            {tariffTrackerDatafields.map((field, key) => (
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
            {tariffsTrackersDescriptions.map((field, key) => (
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
        <div className="trackers-tariffs">
            <div className="tariffs-content">
                {tariffsDescriptionsFields}
                {tariffsItems}
            </div>
        </div>
    );
};

export default React.memo(TrackersTariffsTab);
