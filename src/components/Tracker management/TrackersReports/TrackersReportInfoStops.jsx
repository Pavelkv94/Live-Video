import React from "react";
import { Button, Card } from "antd";
import "./TrackersReports.scss";
import { dateConvert } from "../../../utils/dateConvert";
import html2pdf from "html2pdf.js";

const TrackersReportInfoStops = ({ t, reports }) => {
    const downloadAsPdf = () => {
        const element = document.getElementById("reports-info-tables");
        html2pdf().from(element).save(`${t("tracker_movement_summary")}: ${reports.map(el => el.tracker_name).join(", ")}.pdf`);
    };

    const dataTable = (movements) =>
        movements.map((el, index) => {
            const diffInMillis = new Date(el.end_datetime).getTime() - new Date(el.start_datetime).getTime();
            const diffInSeconds = Math.floor(diffInMillis / 1000);
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);
            const hoursRemainder = diffInHours % 24;
            const minutesRemainder = diffInMinutes % 60;
            const secondsRemainder = diffInSeconds % 60;
            const result = `${diffInDays ? `${diffInDays} days` : ""} ${hoursRemainder ? `${hoursRemainder} H` : ""} ${
                minutesRemainder ? `${minutesRemainder} m` : ""
            } ${secondsRemainder ? `${secondsRemainder} s` : ""}`;

            return (
                <tr key={index}>
                    <td>{el.type}</td>
                    <td>{dateConvert(el.start_datetime)}</td>
                    <td>{dateConvert(el.end_datetime)}</td>
                    <td>{el.distance.toFixed(3)} {t("km")}</td>
                    <td>{result}</td>
                </tr>
            );
        });

    return (
        <div className="reports-info-stops">
            <div className="reports-info-stops-header">
                <Card style={{ background: "#f5f5f5", margin: "10px 0" }}>
                    <Button onClick={downloadAsPdf}>{t("save_as_pdf")}</Button>
                    <Button onClick={() => window.print()}>{t("view_and_print")}</Button>
                </Card>
            </div>
            <div id="reports-info-tables">
                <h3>{t("tracker_movement_summary")}</h3>
                {reports.map((report, i) => (
                    <table className="reports-info-stops-table" key={i}>
                        <thead>
                            <tr className="table-head">
                                <th colSpan={5}>{t("tracker_information")}:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>{t("tracker")}</td>
                                <td colSpan={3}>{report.tracker_name}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>{t("average_fuel_consumption")}</td>

                                <td colSpan={3}>
                                    {report.average_consumption}
                                    {t("l")}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>{t("paid_up_to")}</td>

                                <td colSpan={3}>{dateConvert(report.paid_till)}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr className="table-head">
                                <th colSpan={5}>{t("route_information")}:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>{t("start_date")}</td>

                                <td colSpan={3}>{dateConvert(report.route_summary.start_datetime)}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>{t("end_date")}</td>

                                <td colSpan={3}>{dateConvert(report.route_summary.end_datetime)}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>{t("distance")}</td>

                                <td colSpan={3}>
                                    {report.route_summary.distance.toFixed(3)}
                                    {t("km")}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>{t("route_fuel_consumption")}</td>
                                <td colSpan={3}>
                                    {report.route_summary.consumption.toFixed(2)}
                                    {t("l")}
                                </td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr className="table-head">
                                <th colSpan={5}>Movement and stops:</th>
                            </tr>
                            <tr>
                                <th>{t("type")}</th>
                                <th>{t("start_date")}</th>
                                <th>{t("end_date")}</th>
                                <th>{t("distance")}</th>
                                <th>{t("time")}</th>
                            </tr>
                        </thead>
                        <tbody>{dataTable(report.movement_summary)}</tbody>
                    </table>
                ))}
            </div>
        </div>
    );
};

export default React.memo(TrackersReportInfoStops);
