import React, { useEffect, useState } from "react";
import "./MonitoringObjects.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Divider, Empty } from "antd";
import { fetchMonitoringObjects, fetchSharedMonitoringObjects } from "../../redux/monitoringObjectsReducer";
import { PlusOutlined, SettingOutlined, ShareAltOutlined } from "@ant-design/icons";
import { createMonitoringObject } from "../../redux/monitoringObjectsReducer";
import { initMonitoringObj } from "../general/initialData";
import Meta from "antd/lib/card/Meta";
import { NavLink } from "react-router-dom";
import MonitoringModal from "./MonitoringModal";
import defaultImage from "../../assets/img/defaultImage.jpg";

const MonitoringObjects = ({ t }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const monitoringObjects = useSelector((state) => state.monitoringObjectsReducer.monitoringObjectsList);
    const sharedMonitoringObjectsList = useSelector((state) => state.monitoringObjectsReducer.sharedMonitoringObjectsList);

    const [open, setOpen] = useState(false);
    const [newObject, setNewObject] = useState(initMonitoringObj);

    useEffect(() => {
        dispatch(fetchMonitoringObjects(user.user_id));
        dispatch(fetchSharedMonitoringObjects(user.user_id));
    }, [dispatch]);

    const buildCard = (isShared) => (el, i) =>
        (
            <Card
                key={i}
                style={{
                    width: 262
                }}
                cover={
                    <div className="cover-img">
                        {isShared && (
                            <div className="shared-icon">
                                <ShareAltOutlined />
                            </div>
                        )}
                        <div style={{backgroundImage: `url(${el.picture_url || defaultImage})`}} className="object-image"></div>
                    </div>
                }
                actions={[
                    <NavLink to={`details/${el.id}`} key="setting">
                        <SettingOutlined />
                    </NavLink>
                ]}
            >
                <Meta title={el.name} description={el.description} />
            </Card>
        );

    const monitoringCards = monitoringObjects.map(buildCard(false));
    const sharedMonitoringCards = sharedMonitoringObjectsList.map(buildCard(true));

    const handleCreateNewObj = () => {
        dispatch(createMonitoringObject(user.user_id, newObject));
        setOpen(false);
        setNewObject(initMonitoringObj);
    };

    const handleCancel = () => {
        setOpen(false);
        setNewObject(initMonitoringObj);
    };

    return (
        <div className="monitoring">
            <section className="head-section">
                <h2>{t("menuBar.monitoringObjects")}</h2>
                <Button shape="circle" icon={<PlusOutlined />} onClick={() => setOpen(true)} />
            </section>
            <section className="monitoring-cards">{monitoringCards}</section>
            {!monitoringCards || monitoringCards.length === 0 && <Empty description="No Monitoring Objects"/>}
            <Divider />
            {sharedMonitoringCards && sharedMonitoringCards.length > 0 && <section className="monitoring-cards">{sharedMonitoringCards}</section>}

            {open && (
                <MonitoringModal
                    t={t}
                    open={open}
                    handleCancel={handleCancel}
                    handleSubmit={handleCreateNewObj}
                    mode={"create"}
                    item={newObject}
                    setItem={setNewObject}
                />
            )}
        </div>
    );
};

export default React.memo(MonitoringObjects);
