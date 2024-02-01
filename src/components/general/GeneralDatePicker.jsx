import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import React from "react";

const GeneralDatePicker = ({ t, setSelectedRange, selectedRange, fieldWidth = "400px" }) => {
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
            label: t("today"),
            value: [today, now]
        },
        {
            label: t("yesterday"),
            value: [yesterdayStart, yesterdayEnd]
        },
        {
            label: t("before_yesterday"),
            value: [beforeYesterdayStart, beforeYesterdayEnd]
        },
        {
            label: t("current_week"),
            value: [currentWeek, now]
        },
        {
            label: t("previous_week"),
            value: [previousWeekStart, previousWeekEnd]
        },
        {
            label: t("current_month"),
            value: [currentMonth, now]
        },
        {
            label: t("previous_month"),
            value: [previousMonthStart, previousMonthEnd]
        }
    ];
    
    return (
        <Form.Item label={t("select_date")} name="date">
            <RangePicker
                presets={rangePresets}
                showTime
                format="YYYY-MM-DD HH:mm"
                value={selectedRange}
                onChange={handleRangeChange}
                style={{ width: fieldWidth }}
            />
        </Form.Item>
    );
};

export default React.memo(GeneralDatePicker);
