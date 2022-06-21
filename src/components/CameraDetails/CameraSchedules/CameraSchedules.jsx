import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Card, Col, Empty, Row } from "antd";
import "./CameraSchedules.css";
import { fetchCameraSchedules } from "../../../redux/camerasReducer";
import { dateConvert } from "../../../utils/dateConvert";
import { daysOfWeek, daysOfWeekArray } from "../../general/initialData";
import { assignScheduleToCam } from "../../../redux/schedulesReducer";
import addIcon from "../../../assets/img/add-circle.svg";
import { useState } from "react";
import { AddModalSchedule } from "./AddModalSchedule";

export const CameraSchedules = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const camerasSchedules = useSelector(
        (state) => state.camerasReducer.camerasSchedules
    );

    const [openAddModal, setOpenAddModal] = useState(false);

    useEffect(() => {
        dispatch(fetchCameraSchedules(id));
    }, []);

    const assignToCamera = (cameraId, scheduleId) =>
        dispatch(
            assignScheduleToCam(cameraId, scheduleId, {
                status: true,
                cameras: [cameraId],
            })
        );

    const unAssignFromCamera = (cameraId, scheduleId) =>
        dispatch(
            assignScheduleToCam(cameraId, scheduleId, {
                status: false,
                cameras: [cameraId],
            })
        );

    const scheduleParams = [
        { title: "Job Name:", value: "job_name" },
        { title: "Duration:", value: "duration" },
        { title: "Period:", value: "period" },
        { title: "Start Hour:", value: "start_day" },
        { title: "Start Day:", value: "start_hour" },
        { title: "End Day:", value: "end_day" },
        { title: "End Hour:", value: "end_hour" },
        { title: "Created:", value: "created_at" },
        { title: "Updated:", value: "updated_at" },
    ];

    //todo refactoring
    const showScheduleParams = (schedule) =>
        scheduleParams.map((el, index) => (
            <span key={index}>
                <p>{el.title}</p>
                <p>
                    {el.value === "created_at" || el.value === "updated_at"
                        ? dateConvert(schedule[el.value])
                        : schedule[el.value]}
                </p>
            </span>
        ));

    const camerasSchedulesId = camerasSchedules.map((el) => el.schedule.id);

    const displayCameraSchedules = [
        ...camerasSchedules,
        { schedule: { id: "empty", name: "empty_rec" } },
    ].map((el) =>
        el.schedule.name === "empty_rec" ? (
            <Col span={6} key={el.schedule.id} style={{margin: '10px 0'}}>
                <Card className="add-camera-schedule">
                    <img
                        src={addIcon}
                        alt="addIcon"
                        onClick={() => setOpenAddModal(true)}
                    />
                </Card>
            </Col>
        ) : (
            <Col span={6} key={el.schedule.id} style={{margin: '10px 0'}}>
                <Card
                    title={el.schedule.name}
                    className={`schedule-card ${
                        el.status ? "active-schedule" : "inactive-schedule"
                    }`}
                    extra={
                        <p className="schedule-status">
                            {el.status ? "Active" : "Inactive"}
                        </p>
                    }
                    actions={[
                        <Button
                            type="primary"
                            disabled={el.status}
                            onClick={() => assignToCamera(id, el.schedule.id)}
                        >
                            Enable
                        </Button>,
                        <Button
                            danger
                            disabled={!el.status}
                            onClick={() =>
                                unAssignFromCamera(id, el.schedule.id)
                            }
                        >
                            Disable
                        </Button>,
                    ]}
                >
                    <span>
                        <p>Job Name:</p>
                        <p>{el.schedule.job_name}</p>
                    </span>
                    <span>
                        <p>Duration:</p>
                        <p>{el.schedule.duration}</p>
                    </span>
                    <span>
                        <p>Period:</p>
                        <p>{el.schedule.period}</p>
                    </span>
                    <span>
                        <p>Start Hour:</p>
                        <p>
                            {el.schedule.start_day
                                ? daysOfWeek[el.schedule.start_day]
                                : "—"}
                        </p>
                    </span>
                    <span>
                        <p>Days:</p>
                        <p>
                            {el.schedule.days
                                ? el.schedule.days
                                      .split(",")
                                      .map((el, index) => (
                                          <i key={index}>
                                              {daysOfWeek[el]} <br />
                                          </i>
                                      ))
                                : "—"}
                        </p>
                    </span>

                    <span>
                        <p>End Hour:</p>
                        <p>{el.schedule.end_hour || "—"}</p>
                    </span>
                    <span>
                        <p>Created:</p>
                        <p>{dateConvert(el.schedule.created_at)}</p>
                    </span>
                    <span>
                        <p>Updated:</p>
                        <p>{dateConvert(el.schedule.updated_at)}</p>
                    </span>
                </Card>
            </Col>
        )
    );

    return (
        <div className="camera-schedules">
            <Row gutter={16}>{displayCameraSchedules}</Row>
            {openAddModal && (
                <AddModalSchedule
                    openAddModal={openAddModal}
                    setOpenAddModal={setOpenAddModal}
                    camerasSchedulesId={camerasSchedulesId}
                />
            )}
        </div>
    );
};
