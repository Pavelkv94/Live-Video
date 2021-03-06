import { Badge, Button, Card, PageHeader, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./ScheduleDetails.css";
import {
    fetchAssignedCameras,
    fetchSchedule,
} from "../../redux/schedulesReducer";
import { dateConvert } from "../../utils/dateConvert";
import { CustomModal } from "../general/CustomModal";
import { daysOfWeek } from "../general/initialData";
import {
    asignCameraSchedule,
    fetchCameras,
    unAssignCameraSchedule,
} from "../../redux/camerasReducer";

const ScheduleDetails = React.memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentSchedule = useSelector(
        (state) => state.schedulesReducer.currentSchedule
    );
    const assignedCameras = useSelector(
        (state) => state.schedulesReducer.assignedCameras
    );
    const user = useSelector((state) => state.authReducer.user);
    const camerasList = useSelector(
        (state) => state.camerasReducer.camerasList
    );

    const [flag, setFlag] = useState("default");
    const [open, setOpen] = useState(false);
    // const [checkedSchedule, setCheckedStorage] = useState({});
    // const deleteCameraStatus = useSelector(state => state.camerasReducer.deleteCameraStatus);

    // const filteredCamerasList = camerasList.filter(el => )

    useEffect(() => {
        user && dispatch(fetchCameras(user.id));
    }, [user]);

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

    const assignedCamerasId = assignedCameras.map((el) => el.camera.id);
    const unAssignedCameras = camerasList.filter(
        (el) => !assignedCamerasId.includes(el.id)
    );

    const columns = [
        {
            title: "Camera",
            dataIndex: "name",
            key: "name",
            render: (text, params) => (
                <div className="dot">
                    <Badge status={params.status ? "success" : "error"} />
                    <p>{text}</p>
                </div>
            ),
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
            render: (el, params) => (
                <Button
                className="unassign-camera"
                    onClick={() =>
                        dispatch(unAssignCameraSchedule(params.id, id))
                    }
                >
                    Unassign
                </Button>
            ),
        },
    ];

    const columns2 = [
        {
            title: "Camera",
            dataIndex: "name",
            key: "name",
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
            render: (el, params) => (
                <Button className="assign-camera"
                    onClick={() => dispatch(asignCameraSchedule(params.id, id))}
                >
                    Assign
                </Button>
            ),
        },
    ];

    const data = assignedCameras.map((el) => ({
        ...el.camera,
        key: el.camera.id,
        created_at: dateConvert(el.camera.created_at),
        updated_at: dateConvert(el.camera.updated_at),
        status: el.status,
    }));

    const data2 = unAssignedCameras.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at),
        status: el.status,
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
                            <p>Days:</p>
                            <p>
                                {currentSchedule.days
                                    ? currentSchedule.days.split(',').map((el, index) => <i key={index}>{daysOfWeek[el]} <br/></i>)
                                    : "???"}
                            </p>
                        </span>
                        <span>
                            <p>Start Hour:</p>
                            <p>{currentSchedule.start_hour || "???"}</p>
                        </span>
                        <span>
                            <p>End Hour:</p>
                            <p>{currentSchedule.end_hour || "???"}</p>
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
                    <br />
                    <div className="cameras-title">
                        <h2>Unassigned Cameras</h2>
                    </div>
                    <Table
                        columns={columns2}
                        dataSource={data2}
                        pagination={false}
                        bordered
                    />
                </section>
            </div>

            {open && <CustomModal
                open={open}
                setOpen={setOpen}
                flag={flag}
                setFlag={setFlag}
                checkedElement={currentSchedule}
            />}
        </div>
    );
});

export default ScheduleDetails;
