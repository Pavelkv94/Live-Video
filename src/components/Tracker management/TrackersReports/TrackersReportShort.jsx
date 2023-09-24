import React, { useEffect } from "react";
import { mockTrackersReports } from "../../general/mockData";
import { Button, Card } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import "./TrackersReports.scss";
import { useDispatch } from "react-redux";
import { fetchTrackersReports } from "../../../redux/trackersReducer";
import { dateConvert } from "../../../utils/dateConvert";
import html2pdf from "html2pdf.js";

const TrackersReportShort = ({ t }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrackersReports("21.06.2023", "27.06.2023"));
    }, [dispatch]);

    // const reports = useSelector((state) => state.trackersReducer.reports);
    // const reports = mockTrackersReports;
    const downloadAsPdf = () => {
        const element = document.getElementById("reports-short-tables");
        html2pdf().from(element).save("table.pdf");
    };

    return (
        <div className="reports-short">
            <PageHeader className="site-page-header" onBack={() => window.history.back()} title={t("common.reportPreview")} />
            <Card style={{ background: "#f5f5f5", margin: "10px 0" }}>
                <Button onClick={downloadAsPdf}>{t("common.saveAsPdf")}</Button>
                <Button onClick={() => window.print()}>{t("common.viewAndPrint")}</Button>
            </Card>
            <div id="reports-short-tables">
                <h3>{t("common.trReportShort")}</h3>
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
                                    {report.average_consumption}
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
                    </table>
                ))}
            </div>
        </div>
    );
};

export default React.memo(TrackersReportShort);
