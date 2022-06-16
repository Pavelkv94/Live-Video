import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Card, Col, Empty, Row } from "antd";
import "./CameraSchedules.css";
import { fetchCameraSchedules } from "../../../redux/camerasReducer";
import { dateConvert } from "../../../utils/dateConvert";
import { daysOfWeek } from "../../general/initialData";
import { assignScheduleToCam } from "../../../redux/schedulesReducer";
import { FileAddOutlined } from "@ant-design/icons";
import addIcon from "../../../assets/img/add-circle.svg"

export const CameraSchedules = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const camerasSchedules = useSelector(
        (state) => state.camerasReducer.camerasSchedules
    );

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

    const displayCameraSchedules = [
        ...camerasSchedules,
        { schedule: { id: "empty", name: "empty_rec" } },
    ].map((el) =>
        el.schedule.name === "empty_rec" ? (
            <Col span={6} key={el.schedule.id}>
                <Card className="add-camera-schedule"><img src={addIcon} alt="addIcon" /></Card>
            </Col>
        ) : (
            <Col span={6} key={el.schedule.id}>
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
                        <p>Start Day:</p>
                        <p>{el.schedule.start_houe || "—"}</p>
                    </span>
                    <span>
                        <p>End Day:</p>
                        <p>
                            {el.schedule.end_day
                                ? daysOfWeek[el.schedule.end_day]
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
        <div>
            <Row gutter={16}>{displayCameraSchedules}</Row>
        </div>
    );
};
