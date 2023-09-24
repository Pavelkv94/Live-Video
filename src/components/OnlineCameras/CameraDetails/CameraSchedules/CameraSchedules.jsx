import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Card, Col, Row } from "antd";
import "./CameraSchedules.scss";
import addIcon from "../../../../assets/img/add-circle.svg";
import { useState } from "react";
import { AddModalSchedule } from "./AddModalSchedule";
import { fetchCameraSchedules, unAssignCameraSchedule } from "../../../../redux/camerasReducer";
import { assignScheduleToCam } from "../../../../redux/schedulesReducer";
import { daysOfWeek } from "../../../general/initialData";
import { dateConvert } from "../../../../utils/dateConvert";

export const CameraSchedules = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const camerasSchedules = useSelector((state) => state.camerasReducer.camerasSchedules);

    const [openAddModal, setOpenAddModal] = useState(false);

    useEffect(() => {
        dispatch(fetchCameraSchedules(id));
    }, []);

    const enableCamera = (cameraId, scheduleId) =>
        dispatch(
            assignScheduleToCam(cameraId, scheduleId, {
                status: true,
                cameras: [cameraId]
            })
        );

    const disableCamera = (cameraId, scheduleId) =>
        dispatch(
            assignScheduleToCam(cameraId, scheduleId, {
                status: false,
                cameras: [cameraId]
            })
        );
    const unAssignFromCamera = (scheduleId) =>  dispatch(unAssignCameraSchedule(id, scheduleId));

    // const scheduleParams = [
    //     { title: "Job Name:", value: "job_name" },
    //     { title: "Duration:", value: "duration" },
    //     { title: "Period:", value: "period" },
    //     { title: "Start Hour:", value: "start_day" },
    //     { title: "Start Day:", value: "start_hour" },
    //     { title: "End Day:", value: "end_day" },
    //     { title: "End Hour:", value: "end_hour" },
    //     { title: "Created:", value: "created_at" },
    //     { title: "Updated:", value: "updated_at" },
    // ];

    // //todo refactoring
    // const showScheduleParams = (schedule) =>
    //     scheduleParams.map((el, index) => (
    //         <span key={index}>
    //             <p>{el.title}</p>
    //             <p>{el.value === "created_at" || el.value === "updated_at" ? dateConvert(schedule[el.value]) : schedule[el.value]}</p>
    //         </span>
    //     ));

    const camerasSchedulesId = camerasSchedules.map((el) => el.id);

    const displayCameraSchedules = [...camerasSchedules, { id: "empty", name: "empty_rec" }].map((el) =>
        el.name === "empty_rec" ? (
            <Col span={6} key={el.id} style={{ margin: "10px 0" }}>
                <Card className="add-camera-schedule">
                    <img src={addIcon} alt="addIcon" onClick={() => setOpenAddModal(true)} />
                </Card>
            </Col>
        ) : (
            <Col span={6} key={el.id} style={{ margin: "10px 0" }}>
                <Card
                    title={el.name}
                    className={`schedule-card ${el.status ? "active-schedule" : "inactive-schedule"}`}
                    extra={<p className="schedule-status">{el.status ? "Active" : "Inactive"}</p>}
                    actions={[
                        <Button key={0} type="primary" disabled={el.status} onClick={() => enableCamera(id, el.id)}>
                            Enable
                        </Button>,
                        <Button key={1} danger disabled={!el.status} onClick={() => disableCamera(id, el.id)}>
                            Disable
                        </Button>,
                        <Button key={2} danger type="primary" onClick={() => unAssignFromCamera(el.id)}>
                            Unassign
                        </Button>
                    ]}
                >
                    <span>
                        <p>Job Name:</p>
                        <p>{el.job_name}</p>
                    </span>
                    <span>
                        <p>Duration:</p>
                        <p>{el.duration}</p>
                    </span>
                    <span>
                        <p>Period:</p>
                        <p>{el.period}</p>
                    </span>
                    <span>
                        <p>Start Hour:</p>
                        <p>{el.start_day ? daysOfWeek[el.start_day] : "—"}</p>
                    </span>
                    <span>
                        <p>Days:</p>
                        <p>
                            {el.days
                                ? el.days.split(",").map((el, index) => (
                                    <i key={index}>
                                        {daysOfWeek[el]} <br />
                                    </i>
                                ))
                                : "—"}
                        </p>
                    </span>

                    <span>
                        <p>End Hour:</p>
                        <p>{el.end_hour || "—"}</p>
                    </span>
                    <span>
                        <p>Created:</p>
                        <p>{dateConvert(el.created_at)}</p>
                    </span>
                    <span>
                        <p>Updated:</p>
                        <p>{dateConvert(el.updated_at)}</p>
                    </span>
                </Card>
            </Col>
        )
    );

    return (
        <div className="camera-schedules">
            <Row gutter={16}>{displayCameraSchedules}</Row>
            {openAddModal && <AddModalSchedule openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} camerasSchedulesId={camerasSchedulesId} />}
        </div>
    );
};
