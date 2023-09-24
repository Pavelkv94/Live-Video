import { Badge, Button, Card, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./ScheduleDetails.scss";
import { fetchAssignedCameras, fetchSchedule, updateSchedule } from "../../../redux/schedulesReducer";
import { dateConvert } from "../../../utils/dateConvert";
import { daysOfWeek, initialCheckedDays } from "../../general/initialData";
import { asignCameraSchedule, fetchCameras, unAssignCameraSchedule } from "../../../redux/camerasReducer";
import { PageHeader } from "@ant-design/pro-layout";
import SchedulesModal from "../SchedulesList/SchedulesModal";

const ScheduleDetails = React.memo(({ t }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentSchedule = useSelector((state) => state.schedulesReducer.currentSchedule);
    const assignedCameras = useSelector((state) => state.schedulesReducer.assignedCameras);
    // const assignedCameras = mockCameras.slice(0, -1);

    const user = useSelector((state) => state.authReducer.user);
    const camerasList = useSelector((state) => state.camerasReducer.camerasList);

    const [open, setOpen] = useState(false);
    const [scheduleData, setScheduleData] = useState(currentSchedule);
    const [checkedDays, setCheckedDays] = useState(initialCheckedDays);
    // const [checkedSchedule, setCheckedStorage] = useState({});
    // const deleteCameraStatus = useSelector(state => state.camerasReducer.deleteCameraStatus);

    // const filteredCamerasList = camerasList.filter(el => )

    useEffect(() => {
        user && dispatch(fetchCameras(user.id));
    }, [user]);

    useEffect(() => {
        currentSchedule && setScheduleData(currentSchedule);
    }, [currentSchedule]);

    useEffect(() => {
        dispatch(fetchSchedule(id));
        dispatch(fetchAssignedCameras(id));
    }, []);

    // useEffect(() => {
    //     if(deleteCameraStatus === 'fulfilled') {window.history.back()}
    // }, [deleteCameraStatus]);

    const handleCancelEditSchedule = () => {
        setOpen(false);
        setScheduleData(currentSchedule);
    };

    const handleEditCamera = () => {
        dispatch(
            updateSchedule(
                {
                    ...scheduleData,
                    days:
                        scheduleData.days === ""
                            ? null
                            : checkedDays
                                .filter((el) => el.checked)
                                .map((el) => el.num)
                                .join(","),
                    start_hour: scheduleData.start_hour === "" ? null : scheduleData.start_hour,
                    end_hour: scheduleData.end_hour === "" ? null : scheduleData.end_hour
                },
                id
            )
        );
        setOpen(false);
    };

    const assignedCamerasId = assignedCameras.map((el) => el.id);
    const unAssignedCameras = camerasList.filter((el) => !assignedCamerasId.includes(el.id));
    // const unAssignedCameras = mockCameras.slice(-1);
    const columns = [
        {
            title: t("onlineCameras.camera"),
            dataIndex: "name",
            key: "name",
            render: (text, params) => (
                <div className="dot">
                    <Badge status={params.status ? "success" : "error"} />
                    <p>{text}</p>
                </div>
            )
        },
        {
            title: "IP",
            dataIndex: "ip",
            key: "ip"
        },
        {
            title: t("onlineCameras.login"),
            dataIndex: "login",
            key: "login"
        },
        {
            title: t("onlineCameras.password"),
            dataIndex: "password",
            key: "password"
        },
        {
            title: "",
            dataIndex: "asign",
            key: "asign",
            render: (el, params) => (
                <Button className="unassign-camera" onClick={() => dispatch(unAssignCameraSchedule(params.id, id))}>
                    {t("onlineCameras.unassign")}
                </Button>
            )
        }
    ];

    const columns2 = [
        {
            title: t("onlineCameras.camera"),
            dataIndex: "name",
            key: "name"
        },
        {
            title: "IP",
            dataIndex: "ip",
            key: "ip"
        },
        {
            title: t("onlineCameras.login"),
            dataIndex: "login",
            key: "login"
        },
        {
            title: t("onlineCameras.password"),
            dataIndex: "password",
            key: "password"
        },
        {
            title: "",
            dataIndex: "asign",
            key: "asign",
            render: (el, params) => (
                <Button className="assign-camera" onClick={() => dispatch(asignCameraSchedule(params.id, id))}>
                    {t("onlineCameras.assign")}
                </Button>
            )
        }
    ];

    const data = assignedCameras.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at),
        status: el.status
    }));

    const data2 = unAssignedCameras.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at),
        status: el.status
    }));

    return (
        <div>
            <PageHeader className="site-page-header" onBack={() => window.history.back()} title={currentSchedule.name} />
            <div className="schedule-details">
                <section>
                    <h2>{t("onlineCameras.scheduleDetails")}</h2>
                    <Card>
                        <span>
                            <p>{t("onlineCameras.duration")}:</p>
                            <p>{currentSchedule.duration}</p>
                        </span>
                        <span>
                            <p>{t("onlineCameras.period")}:</p>
                            <p>{currentSchedule.period}</p>
                        </span>
                        <span>
                            <p>{t("onlineCameras.days")}:</p>
                            <p>
                                {currentSchedule.days
                                    ? currentSchedule.days.split(",").map((el, index) => (
                                        <i key={index}>
                                            {daysOfWeek[el]} <br />
                                        </i>
                                    ))
                                    : "—"}
                            </p>
                        </span>
                        <span>
                            <p>{t("onlineCameras.startHour")}:</p>
                            <p>{currentSchedule.start_hour || "—"}</p>
                        </span>
                        <span>
                            <p>{t("onlineCameras.endHour")}:</p>
                            <p>{currentSchedule.end_hour || "—"}</p>
                        </span>
                        <span>
                            <p>{t("onlineCameras.created")}:</p>
                            <p>{dateConvert(currentSchedule.created_at)}</p>
                        </span>
                        <span>
                            <span></span>
                            <span>
                                <Button
                                    onClick={() => {
                                        setOpen(true);
                                        // setCheckedElement(currentSchedule);
                                    }}
                                >
                                    {t("common.edit")}
                                </Button>
                            </span>
                        </span>
                    </Card>
                </section>
                <section>
                    <div className="cameras-title">
                        <h2>{t("onlineCameras.assignedCameras")}</h2>
                    </div>
                    <Table columns={columns} dataSource={data} pagination={false} bordered />
                    <br />
                    <div className="cameras-title">
                        <h2>{t("onlineCameras.unassignedCameras")}</h2>
                    </div>
                    <Table columns={columns2} dataSource={data2} pagination={false} bordered />
                </section>
            </div>

            {open && (
                <SchedulesModal
                    t={t}
                    open={open}
                    item={scheduleData}
                    handleCancel={handleCancelEditSchedule}
                    handleSubmit={handleEditCamera}
                    setItem={setScheduleData}
                    checkedDays={checkedDays}
                    setCheckedDays={setCheckedDays}
                    mode="edit"
                />
            )}
        </div>
    );
});

export default ScheduleDetails;
