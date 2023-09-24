import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import React from "react";

const GeneralDatePicker = ({ t, setSelectedRange, selectedRange }) => {
    const { RangePicker } = DatePicker;
    const now = dayjs();
    const today = now.set("h", 0).set("m", 0);
    const yesterdayStart = today.add(-1, "d");
    const yesterdayEnd = yesterdayStart.set("h", 23).set("m", 59);
    const beforeYesterdayStart = yesterdayStart.add(-1, "d");
    const beforeYesterdayEnd = yesterdayEnd.add(-1, "d");
    const currentWeek = today.day(1);
    const previousWeekStart = currentWeek.add(-7, "d");
    const previousWeekEnd = currentWeek.add(-1, "m");
    const currentMonth = now.startOf("M");
    const previousMonthEnd = currentMonth.add(-1, "m");
    const previousMonthStart = previousMonthEnd.startOf("M");

    const handleRangeChange = (dates) => {
        setSelectedRange(dates ? dates.map((date) => date.format("YYYY-MM-DD HH:mm")) : []);
    };

    const rangePresets = [
        {
            label: t("trackerManagement.today"),
            value: [today, now]
        },
        {
            label: t("trackerManagement.yesterday"),
            value: [yesterdayStart, yesterdayEnd]
        },
        {
            label: t("trackerManagement.beforeYesterday"),
            value: [beforeYesterdayStart, beforeYesterdayEnd]
        },
        {
            label: t("trackerManagement.currentWeek"),
            value: [currentWeek, now]
        },
        {
            label: t("trackerManagement.previousWeek"),
            value: [previousWeekStart, previousWeekEnd]
        },
        {
            label: t("trackerManagement.currentMonth"),
            value: [currentMonth, now]
        },
        {
            label: t("trackerManagement.previousMonth"),
            value: [previousMonthStart, previousMonthEnd]
        }
    ];
    return (
        <Form.Item label={t("trackerManagement.selectDate")} name="date">
            <RangePicker presets={rangePresets} showTime format="YYYY-MM-DD HH:mm" value={selectedRange} onChange={handleRangeChange} />
        </Form.Item>
    );
};

export default React.memo(GeneralDatePicker);
