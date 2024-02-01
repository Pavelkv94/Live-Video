import { Button, Form, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "./TrackersReports.scss";
import GeneralDatePicker from "../../general/GeneralDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackers, fetchTrackersReports, fetchTrackersReportsAction } from "../../../redux/trackersReducer";
import TrackersReportDetDay from "./TrackersReportDetDay";
import TrackersReportShort from "./TrackersReportShort";
import TrackersReportInfoStops from "./TrackersReportInfoStops";
import TrackersReportDetDayInfoStops from "./TrackersReportDetDayInfoStops";

const TrackersReports = ({ t, isMobileSize }) => {
    const dispatch = useDispatch();

    const trackersList = useSelector((state) => state.trackersReducer.trackersList);
    const user = useSelector((state) => state.authReducer.user);
    const reportsFetchStatus = useSelector(state => state.trackersReducer.reportsFetchStatus);
    const reports = useSelector((state) => state.trackersReducer.reports);

    const reportType = useSelector((state) => state.trackersReducer.reportType);
    const [selectedTrackers, setSelectedTrackers] = useState(null);
    const [selectedReportType, setSelectedReportType] = useState(null);
    const [selectedRange, setSelectedRange] = useState([]);

    const fieldWidth = isMobileSize ? "300px" : "400px"; 

    useEffect(() => {
        dispatch(fetchTrackers(user.id));
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(fetchTrackersReportsAction([], ""));
        };
    }, []);

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

    const reportTable = (type) => {
        switch (type) {
        case "trReportShort":
            return <TrackersReportShort t={t} reports={reports} />;
        case "trReportDetDay":
            return <TrackersReportDetDay t={t} reports={reports} />;
        case "trReportInfoStops":
            return <TrackersReportInfoStops t={t} reports={reports} />;
        case "trReportDetDayInfoStops":
            return <TrackersReportDetDayInfoStops t={t} reports={reports} />;
        default:
            return <TrackersReportShort t={t} reports={reports} />;
        }
    };

    
    const onFinish = (val) => {
        const formattedDate = val.date.map((date) => date.toISOString());
        const trackers = val.tr_object.map((el) => `tracker_ids[]=${el}`).join("&");
        dispatch(fetchTrackersReports(
            `start_datetime=${formattedDate[0]}&end_datetime=${formattedDate[1]}${val.reportType}&${trackers}`, reportLink(selectedReportType)));
    };

    const handleSelectTrackers = (value) => {
        setSelectedTrackers({ ...selectedTrackers, trackers: value });
    };
    const reportOptions = [
        { label: t("tracker_route_summary"), value: "&types[]=route_summary" },
        { label: t("tracker_detailed_days"), value: "&types[]=route_summary&types[]=detailed_days" },
        { label: t("tracker_movement_summary"), value: "&types[]=route_summary&types[]=movement_summary" },
        { label: t("tracker_detailed_days_movement_summary"), value: "&types[]=route_summary&types[]=detailed_days&types[]=movement_summary" }
    ];


    return (
        <div className="reports">
            <section className="head-section">
                <h2>{t("reports")}</h2>
            </section>
            <h3 className="head-section-descr">{t("reports_title")}</h3>
            <div className="reports-form">
                <Form onFinish={onFinish}>
                    <Form.Item label={t("object")} name="tr_object">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: fieldWidth, float: "right" }}
                            placeholder={t("please_select")}
                            value={selectedTrackers}
                            onChange={handleSelectTrackers}
                            options={trackersList.map((el) => ({ label: el.name, value: el.id }))}
                        />
                    </Form.Item>
                    <GeneralDatePicker t={t} setSelectedRange={setSelectedRange} selectedRange={selectedRange} fieldWidth={fieldWidth}/>
                    <Form.Item label={t("report_type")} name="reportType">
                        <Select
                            allowClear
                            style={{ width: fieldWidth, float: "right" }}
                            placeholder={t("please_select")}
                            value={selectedReportType}
                            onChange={(value) => setSelectedReportType(value)}
                            options={reportOptions}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!selectedReportType || !selectedTrackers} style={{marginRight: "20px"}}>
                            {t("submit")}
                        </Button>
                        {reportsFetchStatus === "pending" && <Spin />}
                    </Form.Item>
                </Form>
            </div>
            {reports.length > 0 && reportTable(reportType)}
        </div>
    );
};
export default React.memo(TrackersReports);
