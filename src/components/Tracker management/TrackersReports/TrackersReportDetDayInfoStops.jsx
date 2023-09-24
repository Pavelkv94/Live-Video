import React, { useEffect } from "react";
import { mockTrackersReports } from "../../general/mockData";
import { Button, Card } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import "./TrackersReports.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackersReports } from "../../../redux/trackersReducer";
import { dateConvert } from "../../../utils/dateConvert";

const TrackersReportDetDayInfoStops = ({ t }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrackersReports("21.06.2023", "27.06.2023"));
    }, [dispatch]);

    const reports = useSelector((state) => state.trackersReducer.reports);
    // const reports = mockTrackersReports;

    const dataTableStops = (stops) =>
        stops.map((el, index) => {
            const diffInMillis = new Date(el.to).getTime() - new Date(el.from).getTime();
            const diffInSeconds = Math.floor(diffInMillis / 1000);
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);
            const hoursRemainder = diffInHours % 24;
            const minutesRemainder = diffInMinutes % 60;
            const secondsRemainder = diffInSeconds % 60;
            const result = `${diffInDays ? `${diffInDays} days` : ""} ${hoursRemainder ? `${hoursRemainder} hours` : ""} ${
                minutesRemainder ? `${minutesRemainder} minutes` : ""
            } ${secondsRemainder ? `${secondsRemainder} seconds` : ""}`;

            return (
                <tr key={index}>
                    <td>{el.type}</td>

                    <td>{dateConvert(el.from)}</td>
                    <td>{dateConvert(el.to)}</td>
                    <td>{result}</td>
                </tr>
            );
        });

    const dataTableDays = (days) =>
        Object.entries(days).map(([date, markers]) => (
            <tbody key={date}>
                {markers.map((marker, index) => (
                    <tr key={index}>
                        <td colSpan={2}>{dateConvert(marker.timestamp)}</td>
                        <td colSpan={2}>{marker.distance}</td>
                    </tr>
                ))}
            </tbody>
        ));

    return (
        <div className="reports-info-stops">
            <div className="reports-info-stops-header">
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    // eslint-disable-next-line quotes
                    title={'Report Preview "The route of the tracker with the details of the mileage by day and information on stops/movements"'}
                />
                <Card style={{ background: "#f5f5f5", margin: "10px 0" }}>
                    <Button onClick={() => window.print()}>Print</Button>
                    <Button onClick={() => window.print()}>View as PDF Document</Button>
                    <Button onClick={() => window.print()}> Print as PDF Document</Button>
                    <Button onClick={() => window.print()}>Save as PDF document</Button>
                </Card>
            </div>
            {mockTrackersReports.map((report, i) => (
                <table className="reports-info-stops-table" key={i}>
                    <thead>
                        <tr className="table-head">
                            <th colSpan={4}>{t("common.trackerInformation")}:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>{t("common.tracker")}</td>
                            <td colSpan={2}>{report.object}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>{t("common.averageFuelConsumption")}</td>

                            <td colSpan={2}>
                                {reports.average_consumption}
                                {t("common.l")}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>{t("common.paidUpTo")}</td>

                            <td colSpan={2}>{dateConvert(report.paid_till)}</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr className="table-head">
                            <th colSpan={4}>{t("common.routeInformation")}:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>{t("common.startDate")}</td>

                            <td colSpan={2}>{dateConvert(report.route_info.start_date)}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>{t("common.endDate")}</td>

                            <td colSpan={2}>{dateConvert(report.route_info.end_date)}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>{t("common.distance")}</td>

                            <td colSpan={2}>
                                {report.route_info.distance}
                                {t("common.km")}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>{t("common.routeFuelConsumption")}</td>
                            <td colSpan={2}>
                                {report.route_info.consumption}
                                {t("common.l")}
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr className="table-head" style={{ borderBottom: "1px solid black" }}>
                            <th colSpan={4}>Route by day:</th>
                        </tr>
                        <tr>
                            <th colSpan={2}>Timestamp</th>
                            <th colSpan={2}>Distance</th>
                        </tr>
                    </thead>
                    {dataTableDays(report.days_info)}
                    <thead>
                        <tr className="table-head">
                            <th colSpan={4}>Movement and stops:</th>
                        </tr>
                        <tr>
                            <th>{t("common.type")}</th>
                            <th>{t("common.startDate")}</th>
                            <th>{t("common.endDate")}</th>
                            <th>{t("common.time")}</th>
                        </tr>
                    </thead>
                    <tbody>{dataTableStops(report.stops_info)}</tbody>
                </table>
            ))}
        </div>
    );
};

export default React.memo(TrackersReportDetDayInfoStops);