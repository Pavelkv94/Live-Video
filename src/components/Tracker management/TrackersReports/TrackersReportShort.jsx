import React from "react";
import { Button, Card } from "antd";
import "./TrackersReports.scss";
import { dateConvert } from "../../../utils/dateConvert";
import html2pdf from "html2pdf.js";

const TrackersReportShort = ({ t, reports }) => {

    const downloadAsPdf = () => {
        const element = document.getElementById("reports-short-tables");
        html2pdf().from(element).save(`${t("tracker_route_summary")}: ${reports.map(el => el.tracker_name).join(", ")}.pdf`);
    };

    return (
        <div className="reports-short">
            <Card style={{ background: "#f5f5f5", margin: "10px 0" }}>
                <Button onClick={downloadAsPdf}>{t("save_as_pdf")}</Button>
                <Button onClick={() => window.print()}>{t("view_and_print")}</Button>
            </Card>
            <div id="reports-short-tables">
                <h3>{t("tracker_route_summary")}</h3>
                {reports.map((report, i) => (
                    <table className="reports-item" key={i}>
                        <thead>
                            <tr className="table-head">
                                <th colSpan={2}>{t("tracker_information")}:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{t("tracker")}</td>
                                <td>{report.tracker_name}</td>
                            </tr>
                            <tr>
                                <td>{t("average_fuel_consumption")}</td>
                                <td>
                                    {report.average_consumption}
                                    {t("l")}
                                </td>
                            </tr>
                            <tr>
                                <td>{t("paid_up_to")}</td>
                                <td>{dateConvert(report.paid_till)}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr className="table-head">
                                <th colSpan={2}>{t("route_information")}:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{t("start_date")}</td>
                                <td>{dateConvert(report.route_summary.start_datetime)}</td>
                            </tr>
                            <tr>
                                <td>{t("end_date")}</td>
                                <td>{dateConvert(report.route_summary.end_datetime)}</td>
                            </tr>
                            <tr>
                                <td>{t("distance")}</td>
                                <td>
                                    {report.route_summary.distance.toFixed(3)}
                                    {t("km")}
                                </td>
                            </tr>
                            <tr>
                                <td>{t("route_fuel_consumption")}</td>
                                <td>
                                    {report.route_summary.consumption.toFixed(2)}
                                    {t("l")}
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
