import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createSchedule, deleteSchedule, fetchSchedules } from "../../../redux/schedulesReducer";
import { dateConvert } from "../../../utils/dateConvert";
import { DeleteModal } from "../../general/DeleteModal";
import SchedulesModal from "./SchedulesModal";
import { initialCheckedDays, initialSchedule } from "../../general/initialData";

const SchedulesList = React.memo(({t, isMobileSize}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [checkedSchedule, setCheckedSchedule] = useState({});
    const [scheduleData, setScheduleData] = useState(initialSchedule);
    const [checkedDays, setCheckedDays] = useState(initialCheckedDays);

    const user = useSelector((state) => state.authReducer.user);
    const schedulesList = useSelector(
        (state) => state.schedulesReducer.schedulesList
    );

    useEffect(() => {
        user && dispatch(fetchSchedules());
    }, [user]);

    const handleSubmitDeleteModal = () => {
        dispatch(deleteSchedule(checkedSchedule.id));
        setIsModalVisible(false);
    };

    const handleCancelCreateSchedule = () => {
        setOpen(false);
        setScheduleData(initialSchedule);
    };
    
    const handleCreateCamera = () => {
        dispatch(
            createSchedule(
                {
                    ...scheduleData,
                    days: checkedDays
                        .filter((el) => el.checked)
                        .map((el) => el.num)
                        .join(","),
                    start_hour: scheduleData.start_hour === "" ? null : scheduleData.start_hour,
                    end_hour: scheduleData.end_hour === "" ? null : scheduleData.end_hour
                }
            )
        );
        setOpen(false);
    };

    const columns = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            render: (text, params) => (
                <NavLink to={`details/${params.key}`}>{text}</NavLink>
            )
        },
        {
            title: t("duration_s"),
            dataIndex: "duration",
            key: "duration"
        },
        {
            title: t("period_s"),
            dataIndex: "period",
            key: "period"
        },
        {
            title: t("created"),
            dataIndex: "created_at",
            key: "created_at"
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
        }

        
    ];
    const data = schedulesList.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at)
    }));

    return (
        <div className="schedules">
            <section className="head-section">
                <h2>{t("schedules")}</h2>
                <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => setOpen(true)}
                />
            </section>
            <Table columns={columns} dataSource={data} pagination={data.length > 9} size={isMobileSize ? "small" : "middle"}/>
            {open && <SchedulesModal
                t={t}
                open={open}
                item={scheduleData}
                handleCancel={handleCancelCreateSchedule}
                handleSubmit={handleCreateCamera}
                setItem={setScheduleData}
                checkedDays={checkedDays}
                setCheckedDays={setCheckedDays}
                mode="create"
            />}
            

            {isModalVisible && <DeleteModal
                t={t}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item="schedule"
                submitModal={handleSubmitDeleteModal}
            />}
        </div>
    );
});

export default SchedulesList;
