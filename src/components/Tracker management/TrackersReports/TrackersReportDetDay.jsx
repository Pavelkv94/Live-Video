import React, { useEffect } from "react";
import { mockTrackersReports } from "../../general/mockData";
import { Button, Card } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import "./TrackersReports.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackersReports } from "../../../redux/trackersReducer";
import { dateConvert } from "../../../utils/dateConvert";
import { html2pdf } from "html2pdf.js";

const TrackersReportDetDay = ({ t }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrackersReports("21.06.2023", "27.06.2023"));
    }, [dispatch]);

    const reports = useSelector((state) => state.trackersReducer.reports);
    // const reports = mockTrackersReports;

    const downloadAsPdf = () => {
        const element = document.getElementById("reports-short-tables");
        html2pdf().from(element).save("table.pdf");
    };

    const dataTable = (days) =>
        Object.entries(days).map(([date, markers]) => (
            <tbody key={date}>
                {markers.map((marker, index) => (
                    <tr key={index}>
                        <td>{dateConvert(marker.timestamp)}</td>
                        <td>{marker.distance}</td>
                    </tr>
                ))}
            </tbody>
        ));

    return (
        <div className="reports-short">
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={t("common.reportPreview")}
            />
            <Card style={{ background: "#f5f5f5", margin: "10px 0" }}>
                <Button onClick={downloadAsPdf}>{t("common.saveAsPdf")}</Button>
                <Button onClick={() => window.print()}>{t("common.viewAndPrint")}</Button>
            </Card>
            {mockTrackersReports.map((report, i) => (
                <table className="reports-item" key={i}>
                    <thead>
                        <tr className="table-head">
                            <th colSpan={2}>{t("common.trackerInformation")}:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{t("common.tracker")}</td>
                            <td>{report.object}</td>
                        </tr>
                        <tr>
                            <td>{t("common.averageFuelConsumption")}</td>
                            <td>
                                {reports.average_consumption}
                                {t("common.l")}
                            </td>
                        </tr>
                        <tr>
                            <td>{t("common.paidUpTo")}</td>
                            <td>{dateConvert(report.paid_till)}</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr className="table-head">
                            <th colSpan={2}>{t("common.routeInformation")}:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{t("common.startDate")}</td>
                            <td>{dateConvert(report.route_info.start_date)}</td>
                        </tr>
                        <tr>
                            <td>{t("common.endDate")}</td>
                            <td>{dateConvert(report.route_info.end_date)}</td>
                        </tr>
                        <tr>
                            <td>{t("common.distance")}</td>
                            <td>
                                {report.route_info.distance}
                                {t("common.km")}
                            </td>
                        </tr>
                        <tr>
                            <td>{t("common.routeFuelConsumption")}</td>
                            <td>
                                {report.route_info.consumption}
                                {t("common.l")}
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr className="table-head" style={{borderBottom: "1px solid black"}}>
                            <th colSpan={2}>Route by day:</th>
                        </tr>
                        <tr>
                            <th>Timestamp</th>
                            <th>Distance</th>
                        </tr>
                    </thead>
                    {dataTable(report.days_info)}
                </table>
            ))}
        </div>
    );
};

export default React.memo(TrackersReportDetDay);
