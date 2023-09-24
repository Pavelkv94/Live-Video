import { Button, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import "./TrackersReports.scss";
import GeneralDatePicker from "../../general/GeneralDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackers, fetchTrackersReports } from "../../../redux/trackersReducer";
import { Link } from "react-router-dom";

const TrackersReports = ({ t }) => {
    const dispatch = useDispatch();

    const trackersList = useSelector((state) => state.trackersReducer.trackersList);
    const user = useSelector((state) => state.authReducer.user);

    const reportType = useSelector((state) => state.trackersReducer.reportType);
    const [selectedTrackers, setSelectedTrackers] = useState(null);
    const [selectedReportType, setSelectedReportType] = useState(null);
    const [selectedRange, setSelectedRange] = useState([]);

    useEffect(() => {
        dispatch(fetchTrackers(user.user_id));
    }, [dispatch]);


    const reportLink = (val) => {
        switch (val) {
        case "&types[]=route_summary":
            return "trReportShort";
        case "&types[]=route_summary&types[]=detailed_days":
            return "trReportDetDay";
        case "&types[]=route_summary&types[]=movement_summary":
            return "trReportInfoStops";
        case "&types[]=route_summary&types[]=detailed_days&types[]=movement_summary":
            return "trReportDetDayInfoStops";
        default:
            return "trReportShort";
        }
    };
    
    /* eslint-disable no-console */
    const onFinish = (val) => {
        const formattedDate = val.date.map((date) => date.format("YYYY-MM-DD HH:mm"));
        dispatch(fetchTrackersReports(val.tr_object, `start_datetime=${formattedDate[0]}&end_datetime=${formattedDate[1]}${val.reportType}`, reportLink(selectedReportType)));
    };

    const handleSelectTrackers = (value) => {
        setSelectedTrackers({ ...selectedTrackers, trackers: value });
    };
    const reportOptions = [
        { label: t("common.trReportShort"), value: "&types[]=route_summary" },
        { label: t("common.trReportDetDay"), value: "&types[]=route_summary&types[]=detailed_days" },
        { label: t("common.trReportInfoStops"), value: "&types[]=route_summary&types[]=movement_summary" },
        { label: t("common.trReportDetDayInfoStops"), value: "&types[]=route_summary&types[]=detailed_days&types[]=movement_summary" }
    ];


    return (
        <div className="reports">
            <section className="head-section">
                <h2>{t("menuBar.reports")}</h2>
            </section>
            <h3>{t("trackerManagement.reportsTitle")}</h3>
            <div className="reports-form">
                <Form onFinish={onFinish}>
                    <Form.Item label={t("trackerManagement.object")} name="tr_object">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "400px", float: "right" }}
                            placeholder={t("common.pleaseSelect")}
                            value={selectedTrackers}
                            onChange={handleSelectTrackers}
                            options={trackersList.map((el) => ({ label: el.trobject_name, value: el.trobject_id }))}
                        />
                    </Form.Item>
                    <GeneralDatePicker t={t} setSelectedRange={setSelectedRange} selectedRange={selectedRange} />
                    <Form.Item label={t("trackerManagement.reportType")} name="reportType">
                        <Select
                            allowClear
                            style={{ width: "400px", float: "right" }}
                            placeholder={t("common.pleaseSelect")}
                            value={selectedReportType}
                            onChange={(value) => setSelectedReportType(value)}
                            options={reportOptions}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!selectedReportType || !selectedTrackers}>
                            {t("common.submit")}
                        </Button>
                        {reportType && (
                            <Link to={reportType}>
                                <Button type="primary">{t("common.view")}</Button>
                            </Link>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default React.memo(TrackersReports);
