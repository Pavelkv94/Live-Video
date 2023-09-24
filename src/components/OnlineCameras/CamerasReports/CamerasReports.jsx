import { Button, DatePicker, Form,  Select } from "antd";
import React from "react";
import dayjs from "dayjs";
import "./CamerasReports.scss";

const CamerasReports = ({ t }) => {
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

    /* eslint-disable no-console */
    const onFinish = (val) => {
        console.log(val, "values");
    };

    const testObjects = [
        {
            name: "test1",
            value: "test1"
        },
        {
            name: "test2",
            value: "test2"
        }, {
            name: "test3",
            value: "test3"
        }, {
            name: "test4",
            value: "test4"
        }
    ];

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
        <div className="common-list">
            <section className="head-section">
                <h2>{t("menuBar.reports")}</h2>
            </section>
            <h3>{t("trackerManagement.reportsTitle")}</h3>
            <div className="reports-form">
                <Form

                    onFinish={onFinish}
                >
                    <Form.Item label={t("trackerManagement.object")} name="object">
                        <Select style={{
                            width: 120
                        }}>
                            {testObjects.map((obj) => (
                                <Select.Option value={obj.value} key={obj.value}></Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label={t("trackerManagement.selectDate")} name="date">
                        <RangePicker
                            presets={rangePresets}
                            showTime
                            format="YYYY-MM-DD HH:mm"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{t("common.submit")}</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default React.memo(CamerasReports);


