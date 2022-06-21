import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteSchedule, fetchSchedules } from "../../redux/schedulesReducer";
import { dateConvert } from "../../utils/dateConvert";
import { CustomModal } from "../general/CustomModal";
import { DeleteModal } from "../general/DeleteModal";

const SchedulesList = React.memo(() => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState("default");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checkedSchedule, setCheckedSchedule] = useState({});

    const user = useSelector((state) => state.authReducer.user);
    const schedulesList = useSelector(
        (state) => state.schedulesReducer.schedulesList
    );

    useEffect(() => {
        user && dispatch(fetchSchedules(user.id));
    }, [user]);

    const showModal = (flag) => {
        setFlag(flag);
        setOpen(true);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, params) => (
                <NavLink to={`details/${params.key}`}>{text}</NavLink>
            ),
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
            dataIndex: "delete",
            key: "delete",
            render: (el, params) =>  <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
                setIsModalVisible(true);
                setCheckedSchedule(params);
            }}
        />
        },

        
    ];
    const data = schedulesList.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at),
    }));

    return (
        <div className="common-list">
            <section>
                <h2>Schedules</h2>{" "}
                <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => showModal("create_schedule")}
                />
            </section>
            <Table columns={columns} dataSource={data} pagination={data.length > 9}/>

            {open && <CustomModal
                open={open}
                setOpen={setOpen}
                flag={flag}
                setFlag={setFlag}
            />}
            <DeleteModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item="schedule"
                callback={deleteSchedule}
                id={checkedSchedule.key}
            />
        </div>
    );
});

export default SchedulesList;
