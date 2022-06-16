import { Badge, Button, Card, PageHeader, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./ScheduleDetails.css";
import {
    assignScheduleToCam,
    fetchAssignedCameras,
    fetchSchedule,
} from "../../redux/schedulesReducer";
import { dateConvert } from "../../utils/dateConvert";
import { CustomModal } from "../general/CustomModal";
import { daysOfWeek } from "../general/initialData";

const ScheduleDetails = React.memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentSchedule = useSelector(
        (state) => state.schedulesReducer.currentSchedule
    );
    const assignedCameras = useSelector(
        (state) => state.schedulesReducer.assignedCameras
    );
    const [flag, setFlag] = useState("default");
    const [open, setOpen] = useState(false);
    // const [checkedSchedule, setCheckedStorage] = useState({});
    // const deleteCameraStatus = useSelector(state => state.camerasReducer.deleteCameraStatus);

    useEffect(() => {
        dispatch(fetchSchedule(id));
        dispatch(fetchAssignedCameras(id));
    }, []);

    // useEffect(() => {
    //     if(deleteCameraStatus === 'fulfilled') {window.history.back()}
    // }, [deleteCameraStatus]);

    const showModal = (flag) => {
        setFlag(flag);
        setOpen(true);
    };
    
    const columns = [
        {
            title: "Camera",
            dataIndex: "name",
            key: "name",
            render: (text, params) =>  <div className="dot"><Badge status={params.status ? "success" : "error"} /><p>{text}</p></div>
        },
        {
            title: "IP",
            dataIndex: "ip",
            key: "ip",
        },
        {
            title: "Login",
            dataIndex: "login",
            key: "login",
        },
        {
            title: "Password",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "",
            dataIndex: "asign",
            key: "asign",
            render: (el, params) => <Button onClick={() => dispatch(assignScheduleToCam(id, { status: true, cameras: [ params.id]}))}>Assign</Button>
        },
    ];

    const data = assignedCameras.map((el) => ({
        ...el.camera,
        key: el.camera.id,
        created_at: dateConvert(el.camera.created_at),
        updated_at: dateConvert(el.camera.updated_at),
        status: el.status
    }));

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={currentSchedule.name}
            />
            <div className="schedule-details">
                <section>
                    <h2>Schedule Details</h2>
                    <Card>
                        <span>
                            <p>Duration:</p>
                            <p>{currentSchedule.duration}</p>
                        </span>
                        <span>
                            <p>Period:</p>
                            <p>{currentSchedule.period}</p>
                        </span>
                        <span>
                            <p>Start Day:</p>
                            <p>{currentSchedule.start_day ? daysOfWeek[currentSchedule.start_day] : "—"}</p>
                        </span>
                        <span>
                            <p>Start Hour:</p>
                            <p>{currentSchedule.start_hour || "—"}</p>
                        </span>
                        <span>
                            <p>End Day:</p>
                            <p>{currentSchedule.end_day ? daysOfWeek[currentSchedule.end_day] : "—"}</p>
                        </span>
                        <span>
                            <p>End Hour:</p>
                            <p>{currentSchedule.end_hour || "—"}</p>
                        </span>
                        <span>
                            <p>Created:</p>
                            <p>{dateConvert(currentSchedule.created_at)}</p>
                        </span>
                        <span>
                            <span></span>
                            <span>
                                <Button
                                    onClick={() => {
                                        showModal("edit_schedule");
                                        // setCheckedElement(currentSchedule);
                                    }}
                                >
                                    Edit
                                </Button>
                            </span>
                        </span>
                    </Card>
                </section>
                <section>
                    <div className="cameras-title">
                        <h2>Assigned Cameras</h2>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />
                </section>
            </div>

            <CustomModal
                open={open}
                setOpen={setOpen}
                flag={flag}
                setFlag={setFlag}
                checkedElement={currentSchedule}
            />
        </div>
    );
});

export default ScheduleDetails;
