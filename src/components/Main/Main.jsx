import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Layout, Spin } from "antd";
import { Navigate, useNavigate } from "react-router";
import { MenuBar } from "./MenuBar";
import { DisconnectOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { connectToUserAction, disconnectFromUser, logoutUser } from "../../redux/authReducer";
import { YMaps } from "@pbe/react-yandex-maps";
import { fetchNotifications } from "../../redux/notificationsReducer";
import Geocode from "react-geocode";
import "./Main.scss";
import connectSvg from "../../assets/img/connect.svg";
import logo from "../../assets/img/CompanyLogo.png";

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
const AdminTariffsTrackers = React.lazy(() => import("../Admin/AdminTariffsTrackers/AdminTariffsTrackers"));
const AdminTariffsCameras = React.lazy(() => import("../Admin/AdminTariffsCameras/AdminTariffsCameras"));
const AdminNotifications = React.lazy(() => import("../Admin/AdminNotifications/AdminNotifications"));
const AdminEquipments = React.lazy(() => import("../Admin/AdminEquipments/AdminEquipments"));
const AdminProfile = React.lazy(() => import("../Admin/AdminProfile/AdminProfile"));

const Routes = React.lazy(() => import("../Tracker management/Routes/Routes"));
const Tariffs = React.lazy(() => import("../Tariffs/Tariffs"));
const Feedback = React.lazy(() => import("../Feedback/Feedback"));
const Notifications = React.lazy(() => import("../Notifications/Notifications"));
const MonitoringObjectsDetails = React.lazy(() => import("../MonitoringObjects/MonitoringObjectsDetails/MonitoringObjectsDetails"));
const Prolongation = React.lazy(() => import("../MyAccount/Prolongation/Prolongation"));

export const Main = ({ mode, t }) => {
    Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
    Geocode.setLanguage("en"); //! change lang

    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState(false);
    const [screenSize, setScreenSize] = useState(undefined);
    const [collapsed, setCollapse] = useState(false);
    const user = localStorage.getItem("user");
    const currentuser = useSelector((state) => state.authReducer.user);
    const connectedUser = useSelector((state) => state.authReducer.connectedUser);

    const dispatch = useDispatch();

    const isMobileSize = screenSize < 800;

    const [blinkColor, setBlinkColor] = useState("white");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setBlinkColor((prevColor) => (prevColor === "white" ? "blue" : "white"));
        }, 500); // Adjust the interval duration as needed

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);
    

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (currentuser && !currentuser.admin) {
            dispatch(fetchNotifications(currentuser.id));
            const interval = setInterval(() => {
                dispatch(fetchNotifications(currentuser.id));
            }, import.meta.env.VITE_NOTIFICATION_FREQUENCY || 60000);
            return () => clearInterval(interval);
        }
    }, [dispatch, currentuser]);

    useEffect(() => {
        currentuser?.admin && localStorage.getItem("selected_user") && dispatch(connectToUserAction(JSON.parse(localStorage.getItem("selected_user"))));
    }, [dispatch, currentuser]);

    const logout = () => {
        currentuser?.admin && dispatch(disconnectFromUser());
        dispatch(logoutUser());
    };

    const currentWindow = (mode) => {
        switch (mode) {
        case "cameras":
            return <CamerasList t={t} isMobileSize={isMobileSize} />;
        case "camerasDetails":
            return <CameraDetails t={t} isMobileSize={isMobileSize} />;
        case "storages":
            return <StoragesList t={t} isMobileSize={isMobileSize} />;
        case "storageDetails":
            return <StorageDetails t={t} isMobileSize={isMobileSize} />;
        case "schedules":
            return <SchedulesList t={t} isMobileSize={isMobileSize} />;
        case "scheduleDetails":
            return <ScheduleDetails t={t} isMobileSize={isMobileSize} />;
        case "monitoring":
            return <MonitoringObjects t={t} />;
        case "camReports":
            return <CamerasReports t={t} />;
        case "monitoringDetails":
            return <MonitoringObjectsDetails t={t} isMobileSize={isMobileSize} />;
        case "profile":
            return <Profile t={t} />;
        case "balance":
            return <Balance t={t} isMobileSize={isMobileSize} />;
        case "prolongation":
            return <Prolongation t={t} isMobileSize={isMobileSize} />;
        case "trReports":
            return <TrackersReports t={t} isMobileSize={isMobileSize} />;
        case "trReportShort":
            return <TrackersReportShort t={t} />;
        case "trReportDetDay":
            return <TrackersReportDetDay t={t} />;
        case "trReportInfoStops":
            return <TrackersReportInfoStops t={t} />;
        case "trReportDetDayInfoStops":
            return <TrackersReportDetDayInfoStops t={t} />;
        case "trackers":
            return <Trackers t={t} isMobileSize={isMobileSize} />;
        case "adminUsers":
            return <AdminUsers t={t} />;
        case "adminTariffsTrackers":
            return <AdminTariffsTrackers t={t} />;
        case "adminTariffsCameras":
            return <AdminTariffsCameras t={t} />;
        case "adminNotifications":
            return <AdminNotifications t={t} />;
        case "adminEquipments":
            return <AdminEquipments t={t} />;
        case "adminProfile":
            return <AdminProfile t={t} />;
        case "routes":
            return <Routes t={t} isMobileSize={isMobileSize} />;
        case "feedback":
            return <Feedback t={t} />;
        case "tariffs":
            return <Tariffs t={t} isMobileSize={isMobileSize} />;
        case "notifications":
            return <Notifications t={t} isMobileSize={isMobileSize} />;
        default:
            return <CamerasList t={t} isMobileSize={isMobileSize} />;
        }
    };

    if (!user) {
        return <Navigate to={"/"} />;
    }
    return (
        <Layout>
            <Header className="header">
                <img src={logo} height={40}/>
                <div className="logout">
                    {connectedUser && (
                        <div className="connectedUser">
                            <img src={connectSvg} width={24} className={`blinking-logo ${blinkColor === "white" ? "white" : "blue"}`} />
                            <h2 style={{color: "#cae0ff"}}>{connectedUser.email}</h2>
                            <Button danger icon={<DisconnectOutlined />} onClick={() => {
                                dispatch(disconnectFromUser());
                                if(window.location.pathname.slice(1,6) !== "admin") {
                                    navigate("/adminUsers");
                                }
                            }}/>
                            <h2>|</h2>|
                        </div>
                    ) }
                    <h2><UserOutlined /> {currentuser?.email || currentuser?.admin_mail}</h2>
                    <Button key={1} onClick={logout} size={isMobileSize ? "small" : "middle"}>
                        <LogoutOutlined style={{ marginRight: "10px" }} />
                        {t("logout").toUpperCase()}
                    </Button>
                </div>
                {isMobileSize && (
                    <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                        <MenuOutlined />
                    </Button>
                )}
            </Header>
            <Layout>
                {!isMobileSize && (
                    <Sider width={220} className="site-layout-background" collapsed={collapsed} collapsible onCollapse={() => setCollapse(!collapsed)}>
                        <MenuBar t={t} collapsed={collapsed} />
                    </Sider>
                )}
                {isMobileSize && activeMenu && <MenuBar t={t} collapsed={collapsed} />}

                <Layout
                    style={{
                        padding: isMobileSize ? "10px" : "24px",
                        minHeight: "100%"
                    }}
                >
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: isMobileSize ? 10 : 24,
                            margin: 0,
                            minHeight: isMobileSize ? "calc(100vh - 84px)" : "calc(100vh - 112px)"
                        }}
                    >
                        <YMaps
                            query={{
                                ns: "use-load-option",
                                load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
                                apikey: import.meta.env.VITE_YANDEX_MAP_API_KEY
                            }}
                        >
                            <Suspense fallback={<Spin size="large" />}>{currentWindow(mode)}</Suspense>
                        </YMaps>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
