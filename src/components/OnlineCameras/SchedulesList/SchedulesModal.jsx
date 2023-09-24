import { Checkbox, Col, Input, InputNumber, Row, Select } from "antd";
import React, { useEffect } from "react";
import { GeneralModalWrapper } from "../../general/GeneralModalWrapper";
import { scheduleFields } from "../../general/initialData";
import { useSelector } from "react-redux";

const { Option } = Select;

const SchedulesModal = ({ t, open, item, handleCancel, handleSubmit, setItem, mode, checkedDays, setCheckedDays }) => {
    const editMode = mode === "edit";

    const fields = editMode ? scheduleFields.slice(0, -1): scheduleFields;
    // const [value, setValue] = useState(null);
    // const onChange = (time) => {
    //   setValue(time);
    // };

    const camerasList = useSelector((state) => state.camerasReducer.camerasList);

    const optionsCameras = camerasList.map((el) => <Option key={el.id}>{el.name}</Option>);

    const onChangeDays = (e) => setCheckedDays(checkedDays.map((el) => (el.num === e.target.value ? { ...el, checked: e.target.checked } : el)));

    useEffect(() => {
        editMode &&
            item.days &&
            setCheckedDays(
                checkedDays.map((el) => ({
                    ...el,
                    checked: item.days
                        .split(",")
                        .map((d) => +d)
                        .includes(el.num)
                }))
            );
    }, [editMode]);

    const buildScedulesFields = (el) => {
        if (el.key === "cameras") {
            return (
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: "100%"
                    }}
                    className="cameras-select"
                    placeholder={t("common.select")}
                    defaultValue={item[el.key]}
                    onChange={(value) =>
                        setItem({
                            ...item,
                            [el.key]: value
                        })
                    }
                >
                    {optionsCameras}
                </Select>
            );
        } else if (el.key === "duration" || el.key === "period") {
            return (
                <InputNumber
                    placeholder={el.placeholder}
                    min={0}
                    value={item[el.key]}
                    onChange={(value) => {
                        setItem({
                            ...item,
                            [el.key]: value
                        });
                    }}
                />
            );
        } else if (el.key === "days") {
            return (
                <div>
                    <Row>
                        {checkedDays.map((day, index) => (
                            <Col span={8} key={index}>
                                <Checkbox value={day.num} checked={day.checked} onChange={onChangeDays}>
                                    {day.day}
                                </Checkbox>
                            </Col>
                        ))}
                    </Row>
                </div>
            );
        }
        // else if (el.key === "start_hour" || el.key === "end_hour") {
        //     return (
        //         <div>
        //             <Row>
        //                 <TimePicker defaultValue={dayjs('12:08', 'HH:mm')} format={'HH:mm'} value={value} onChange={onChange}/>
        //             </Row>
        //         </div>
        //     );
        // }
        else
            return (
                <Input
                    value={item[el.key]}
                    placeholder={t(`onlineCameras.${el.placeholder}`)}
                    onChange={(e) => {
                        setItem({
                            ...item,
                            [el.key]: e.currentTarget.value
                        });
                    }}
                />
            );
    };

    return (
        <GeneralModalWrapper
            t={t}
            open={open}
            action={editMode ? "edit" : "create"}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            disableButton={!item.name}
            title={editMode ? t("onlineCameras.editSchedule") : t("onlineCameras.createSchedule")}
        >
            {fields.map((el, index) => (
                <div key={index} className="register-field">
                    <p>{t(`onlineCameras.${el.label}`)}</p>
                    {buildScedulesFields(el)}
                </div>
            ))}
            <p className="help">{t("onlineCameras.modalDescription")}</p>
        </GeneralModalWrapper>
    );
};

export default React.memo(SchedulesModal);
