import { Button, Modal, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { asignCameraSchedule } from "../../../redux/camerasReducer";
import { fetchSchedules } from "../../../redux/schedulesReducer";
import { dateConvert } from "../../../utils/dateConvert";

export const AddModalSchedule = ({ openAddModal, setOpenAddModal, camerasSchedulesId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const schedulesList = useSelector(
        (state) => state.schedulesReducer.schedulesList
    );

    useEffect(() => {
        dispatch(fetchSchedules(user.id));
    }, []);

    const handleOk = () => {
        setOpenAddModal(false);
    };

    const unAssignedCamerasSchedules = schedulesList.filter(
        (el) => !camerasSchedulesId.includes(el.id)
    );

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Job name",
            dataIndex: "job_name",
            key: "job_name",
        },
        {
            title: "Duration, s",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "Period, s",
            dataIndex: "period",
            key: "period",
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "",
            dataIndex: "asign",
            key: "asign",
            render: (el, params) => (
                <Button
                    onClick={() => dispatch(asignCameraSchedule(id, params.id))}
                    style={{color: 'green'}}
                >
                    Assign
                </Button>
            ),
        },
    ];

    const data = unAssignedCamerasSchedules.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at),
    }));

    return (
        <Modal
            width={1000}
            title="Add schedule for camera"
            visible={openAddModal}
            onOk={handleOk}
            onCancel={handleOk}
        >
            <Table
                pagination={data.length > 9}
                columns={columns}
                dataSource={data}
            />
        </Modal>
    );
};
