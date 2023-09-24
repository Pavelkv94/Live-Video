import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Layout, Spin } from "antd";
import { Navigate } from "react-router";
import { MenuBar } from "./MenuBar";
import { LogoutOutlined } from "@ant-design/icons";
import { logoutUser } from "../../redux/authReducer";
import { YMaps } from "@pbe/react-yandex-maps";
import { fetchNotifications } from "../../redux/notificationsReducer";
import Geocode from "react-geocode";

const { Header, Content, Sider } = Layout;
const CamerasList = React.lazy(() => import("../OnlineCameras/CamerasList/CamersList"));
const CameraDetails = React.lazy(() => import("../OnlineCameras/CameraDetails/CameraDetails"));
const StoragesList = React.lazy(() => import("../OnlineCameras/StoragesList/StoragesList"));
const StorageDetails = React.lazy(() => import("../OnlineCameras/StorageDetails/StorageDetails"));
const SchedulesList = React.lazy(() => import("../OnlineCameras/SchedulesList/SchedulesList"));
const ScheduleDetails = React.lazy(() => import("../OnlineCameras/ScheduleDetails/ScheduleDetails"));
const CamerasReports = React.lazy(() => import("../OnlineCameras/CamerasReports/CamerasReports"));
const MonitoringObjects = React.lazy(() => import("../MonitoringObjects/MonitoringObjects"));
const Profile = React.lazy(() => import("../MyAccount/Profile/Profile"));
const Balance = React.lazy(() => import("../MyAccount/Balance/Balance"));
const TrackersReports = React.lazy(() => import("../Tracker management/TrackersReports/TrackersReports"));
const TrackersReportShort = React.lazy(() => import("../Tracker management/TrackersReports/TrackersReportShort"));
const TrackersReportDetDay = React.lazy(() => import("../Tracker management/TrackersReports/TrackersReportDetDay"));
const TrackersReportInfoStops = React.lazy(() => import("../Tracker management/TrackersReports/TrackersReportInfoStops"));
const TrackersReportDetDayInfoStops = React.lazy(() => import("../Tracker management/TrackersReports/TrackersReportDetDayInfoStops"));

const Trackers = React.lazy(() => import("../Tracker management/Trackers/Trackers"));
const AdminUsers = React.lazy(() => import("../Admin/AdminUsers/AdminUsers"));
const AdminTariffs = React.lazy(() => import("../Admin/AdminTariffs/AdminTariffs"));
const AdminNotifications = React.lazy(() => import("../Admin/AdminNotifications/AdminNotifications"));
const AdminEquipments = React.lazy(() => import("../Admin/AdminEquipments/AdminEquipments"));
const Routes = React.lazy(() => import("../Tracker management/Routes/Routes"));
const Tariffs = React.lazy(() => import("../Tariffs/Tariffs"));
const Feedback = React.lazy(() => import("../Feedback/Feedback"));
const Notifications = React.lazy(() => import("../Notifications/Notifications"));
const MonitoringObjectsDetails = React.lazy(() => import("../MonitoringObjects/MonitoringObjectsDetails/MonitoringObjectsDetails"));
const Prolongation = React.lazy(() => import("../MyAccount/Prolongation/Prolongation"));


export const Main = ({ mode, t }) => {
    
    Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
    Geocode.setLanguage("en"); //! change lang

    const [collapsed, setCollapse] = useState(false);
    const user = localStorage.getItem("user");
    const currentuser = useSelector((state) => state.authReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentuser && !currentuser.admin_name) {
            dispatch(fetchNotifications(currentuser.user_id));
            const interval = setInterval(() => {dispatch(fetchNotifications(currentuser.user_id));}, import.meta.env.VITE_NOTIFICATION_FREQUENCY || 60000);
            return () => clearInterval(interval);
        }
    }, [dispatch, currentuser]);

    const logout = () => {
        dispatch(logoutUser());
    };

    const currentWindow = (mode) => {
        switch (mode) {
        case "cameras":
            return <Suspense fallback={<Spin size="large"/>}><CamerasList t={t} /></Suspense>;
        case "camerasDetails":
            return <Suspense fallback={<Spin size="large"/>}><CameraDetails t={t} /></Suspense>;
        case "storages":
            return <Suspense fallback={<Spin size="large"/>}><StoragesList t={t} /></Suspense>;
        case "storageDetails":
            return <Suspense fallback={<Spin size="large"/>}><StorageDetails t={t} /></Suspense>;
        case "schedules":
            return <Suspense fallback={<Spin size="large"/>}><SchedulesList t={t} /></Suspense>;
        case "scheduleDetails":
            return <Suspense fallback={<Spin size="large"/>}><ScheduleDetails t={t} /></Suspense>;
        case "monitoring":
            return <Suspense fallback={<Spin size="large"/>}><MonitoringObjects t={t} /></Suspense>;
        case "camerasReports":
            return <Suspense fallback={<Spin size="large"/>}><CamerasReports t={t} /></Suspense>;
        case "monitoringDetails":
            return <Suspense fallback={<Spin size="large"/>}><MonitoringObjectsDetails t={t} /></Suspense>;
        case "profile":
            return <Suspense fallback={<Spin size="large"/>}><Profile t={t} /></Suspense>;
        case "balance":
            return <Suspense fallback={<Spin size="large"/>}><Balance t={t} /></Suspense>;
        case "prolongation":
            return <Suspense fallback={<Spin size="large"/>}><Prolongation t={t} /></Suspense>;
        case "trReports":
            return <Suspense fallback={<Spin size="large"/>}><TrackersReports t={t} /></Suspense>;
        case "trReportShort":
            return <Suspense fallback={<Spin size="large"/>}><TrackersReportShort t={t} /></Suspense>;   
        case "trReportDetDay":
            return <Suspense fallback={<Spin size="large"/>}><TrackersReportDetDay t={t} /></Suspense>;  
        case "trReportInfoStops":
            return <Suspense fallback={<Spin size="large"/>}><TrackersReportInfoStops t={t} /></Suspense>;              
        case "trReportDetDayInfoStops":
            return <Suspense fallback={<Spin size="large"/>}><TrackersReportDetDayInfoStops t={t} /></Suspense>;  
        case "trackers":
            return <Suspense fallback={<Spin size="large"/>}><Trackers t={t} /></Suspense>;
        case "adminUsers":
            return <Suspense fallback={<Spin size="large"/>}><AdminUsers t={t} /></Suspense>;
        case "adminTariffs":
            return <Suspense fallback={<Spin size="large"/>}><AdminTariffs t={t} /></Suspense>;
        case "adminNotifications":
            return <Suspense fallback={<Spin size="large"/>}><AdminNotifications t={t} /></Suspense>;
        case "adminEquipments":
            return <Suspense fallback={<Spin size="large"/>}><AdminEquipments t={t} /></Suspense>;  
        case "routes":
            return <Suspense fallback={<Spin size="large"/>}><Routes t={t} /></Suspense>;
        case "feedback":
            return <Suspense fallback={<Spin size="large"/>}><Feedback t={t} /></Suspense>;
        case "tariffs":
            return <Suspense fallback={<Spin size="large"/>}><Tariffs t={t} /></Suspense>;
        case "notifications":
            return <Suspense fallback={<Spin size="large"/>}><Notifications t={t} /></Suspense>;
        default:
            return <Suspense fallback={<Spin size="large"/>}><CamerasList t={t} /></Suspense>;
        }
    };

    if (!user) {
        return <Navigate to={"/"} />;
    } 
    return (
        <Layout>
            <Header className="header">
                <div className="logout">
                    <h2>{currentuser?.user_mail || currentuser?.admin_mail}</h2>
                    <Button key={1} onClick={logout}>
                        <LogoutOutlined style={{ marginRight: "10px" }} />
                        LOGOUT
                    </Button>
                </div>
            </Header>
            <Layout>
                <Sider width={220} className="site-layout-background" collapsed={collapsed} collapsible onCollapse={() => setCollapse(!collapsed)}>
                    <MenuBar t={t} collapsed={collapsed}/>
                </Sider>
                <Layout
                    style={{
                        padding: "24px",
                        minHeight: "100%"
                    }}
                >
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: "calc(100vh - 112px)"
                        }}
                    >
                        <YMaps
                            query={{
                                ns: "use-load-option",
                                load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
                                apikey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
                            }}
                        >
                            {currentWindow(mode)}
                        </YMaps>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
