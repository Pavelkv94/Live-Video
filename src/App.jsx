import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { setCurrentUserAction } from "./redux/authReducer";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LoginAdmin } from "./components/Login/LoginAdmin";
import Blocked from "./components/general/Blocked";

function App() {
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation();

    const displayMode = {
        cameras: "cameras",
        camerasDetails: "camerasDetails",
        storages: "storages",
        storagesDetails: "storageDetails",
        schedules: "schedules",
        schedulesDetails: "scheduleDetails",
        monitoring: "monitoring",
        monitoringDetails: "monitoringDetails",
        profile: "profile",
        balance: "balance",
        prolongation: "prolongation",
        trReports: "trReports",
        trReportShort: "trReportShort",
        trReportDetDay: "trReportDetDay",
        trReportInfoStops: "trReportInfoStops",
        trReportDetDayInfoStops: "trReportDetDayInfoStops",
        camerasReports: "camerasReports",
        trackers: "trackers",
        routes: "routes",
        feedback: "feedback",
        tariffs: "tariffs",
        notifications: "notifications",
        adminUsers: "adminUsers",
        adminTariffs: "adminTariffs",
        adminNotifications: "adminNotifications",
        adminEquipments: "adminEquipments"
    };

    useEffect(() => {
        const localUser = localStorage.getItem("user");
        localUser && dispatch(setCurrentUserAction(JSON.parse(localUser)));
    }, []);

    return (
        <div>
            <Routes>
                <Route element={<Blocked status="404" title="404" message={t("common.doesntExist")}/>} path="*" />
                <Route element={<Login t={t} />} path="/" />
                <Route element={<LoginAdmin t={t} />} path="/loginAdmin" />
                <Route element={<Main mode={displayMode.cameras} t={t} />} path="/cameras" />
                <Route element={<Main mode={displayMode.camerasDetails} t={t} />} path="cameras/details/:id" />
                <Route element={<Main mode={displayMode.storages} t={t} />} path="/storages" />
                <Route element={<Main mode={displayMode.storagesDetails} t={t} />} path="storages/details/:id" />
                <Route element={<Main mode={displayMode.schedules} t={t} />} path="/schedules" />
                <Route element={<Main mode={displayMode.schedulesDetails} t={t} />} path="/schedules/details/:id" />
                <Route element={<Main mode={displayMode.camerasReports} t={t} />} path="/camerasReports" />
                <Route element={<Main mode={displayMode.monitoring} t={t} />} path="/monitoring" />
                <Route element={<Main mode={displayMode.monitoringDetails} t={t} />} path="/monitoring/details/:id" />
                <Route element={<Main mode={displayMode.profile} t={t} />} path="/profile" />
                <Route element={<Main mode={displayMode.balance} t={t} />} path="/balance" />
                <Route element={<Main mode={displayMode.prolongation} t={t} />} path="/prolongation" />
                <Route element={<Main mode={displayMode.trReports} t={t} />} path="/trReports" />
                <Route element={<Main mode={displayMode.trReportShort} t={t} />} path="/trReports/trReportShort" />
                <Route element={<Main mode={displayMode.trReportDetDay} t={t} />} path="/trReports/trReportDetDay" />
                <Route element={<Main mode={displayMode.trReportInfoStops} t={t} />} path="/trReports/trReportInfoStops" />
                <Route element={<Main mode={displayMode.trReportDetDayInfoStops} t={t} />} path="/trReports/trReportDetDayInfoStops" />
                <Route element={<Main mode={displayMode.trackers} t={t} />} path="/trackers" />
                <Route element={<Main mode={displayMode.routes} t={t} />} path="/routes" />
                <Route element={<Main mode={displayMode.feedback} t={t} />} path="/feedback" />
                <Route element={<Main mode={displayMode.tariffs} t={t} />} path="/tariffs" />
                <Route element={<Main mode={displayMode.notifications} t={t} />} path="/notifications" />
                <Route element={<Main mode={displayMode.adminUsers} t={t} />} path="/adminUsers" />
                <Route element={<Main mode={displayMode.adminTariffs} t={t} />} path="/adminTariffs" />
                <Route element={<Main mode={displayMode.adminNotifications} t={t} />} path="/adminNotifications" />
                <Route element={<Main mode={displayMode.adminEquipments} t={t} />} path="/adminEquipments" />
            </Routes>
        </div>
    );
}

export default App;
