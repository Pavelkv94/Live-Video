import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polyline } from "@react-google-maps/api";
import "./GlobalMap.scss";
import { ArrowsAltOutlined } from "@ant-design/icons";
import { initGoogleOptions, paletteColorsSVGUrls } from "./initialData";
import blackMarker from "../../assets/img/markers/svg/000000.svg";
import { getAddressGoogle } from "../../utils/getAddress";
import { Spin } from "antd";

const GlobalGoogleMap = ({
    items,
    width = "100%",
    height = "100%",
    setExpandMap,
    realTimeTrackersForPolylines,
    routes,
    mapOptions = initGoogleOptions,
    t,
    mode
}) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        language: "en"
    });

    const containerStyle = {
        width: "100%",
        height: "100%",
        minWidth: "250px",
        border: "1px solid #f0f0f0",
        boxShadow: "2px 2px 10px gray"
    };

    const routesMode = mode === "routes";

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        activeMarker && getAddressGoogle(activeMarker.latitude, activeMarker.longitude, setAddress);
    }, [activeMarker]);

    const handleMarkerClick = (marker) => {
        setActiveMarker(marker);
    };

    const handleMarkerHoverExit = () => {
        setActiveMarker(null);
    };

    const markers = routesMode
        ? items.map((el, i) => (
            <Marker
                key={i}
                position={{ lat: +el.latitude, lng: +el.longitude }}
                title={el.name}
                animation={2} // Bounce animation
                onClick={() => handleMarkerClick(el)}
                icon={{
                    url: paletteColorsSVGUrls[el.color?.slice(1).toUpperCase()] || blackMarker,
                    scaledSize: {
                        width: 32,
                        height: 32
                    }
                }}
            />
        ))
        : items
            .filter((el) => el.isVisibleOnMap)
            .map((el, i) => (
                <Marker
                    key={i}
                    position={{ lat: +el.latitude, lng: +el.longitude }}
                    title={el.name}
                    animation={2} // Bounce animation
                    onClick={() => handleMarkerClick(el)}
                    icon={{
                        url: paletteColorsSVGUrls[el.color?.slice(1).toUpperCase()] || blackMarker,
                        scaledSize: {
                            width: 32,
                            height: 32
                        }
                    }}
                />
            ));

    const polylines = routesMode
        ? routes?.map((route, key) => (
            <Polyline
                key={key}
                path={route.route_summary.coordinates.map((val) => ({ lat: +val[0], lng: +val[1] }))}
                options={{
                    strokeColor: route.tracker_color,
                    strokeOpacity: 1.0,
                    strokeWeight: 3
                }}
            />
        ))
        : realTimeTrackersForPolylines?.map((way, key) => (
            <Polyline
                key={key}
                path={way.map((e) => ({ lat: +e.lat, lng: +e.lng }))}
                options={{
                    strokeColor: way[0].color,
                    srokeOpacity: 1.0,
                    strokeWeight: 3
                }}
            />
        ));

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        // const bounds = new window.google.maps.LatLngBounds(mapOptions.center);
        // map.fitBounds(bounds);
        map.setZoom(6);

        setMap(map);
    }, []);

    // eslint-disable-next-line no-unused-vars
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return (
        <div className="map-wrapper" style={{ width, height }}>
            <div className="expand" onClick={() => setExpandMap((prev) => !prev)}>
                <ArrowsAltOutlined />
            </div>
            {isLoaded ? (
                <GoogleMap mapContainerStyle={containerStyle} center={mapOptions.center} zoom={mapOptions.zoom} onLoad={onLoad} onUnmount={onUnmount}>
                    {markers}
                    {activeMarker && address && (
                        <InfoWindow position={{ lat: +activeMarker.latitude, lng: +activeMarker.longitude }} onCloseClick={handleMarkerHoverExit}>
                            <div>
                                <h3 style={{ margin: "8px 0" }}>
                                    {activeMarker[routesMode ? "name" : "name"]}
                                    {routesMode && activeMarker.mode === "start" ? (
                                        <i style={{ color: "green" }}> ({t("start")})</i>
                                    ) : routesMode && activeMarker.mode === "finish" ? (
                                        <i style={{ color: "orange" }}> ({t("finish")})</i>
                                    ) : (
                                        ""
                                    )}
                                </h3>
                                <p style={{ margin: "0 0 6px 0" }}>{address}</p>
                                {!activeMarker.mode && routesMode && `${t("gsm_signal_level")}: ${activeMarker.gsmsl || "-"}`}
                                {!activeMarker.mode && <br />}
                                {!activeMarker.mode && `${t("satellites")}: ${activeMarker.satellites || "-"}`}
                                {!activeMarker.mode && <p style={{ margin: "0" }}>{`${t("speed")}: ${activeMarker.speed || "-"} ${t("kmh")}`}</p>}
                                {activeMarker.mode && <i style={{ margin: "0", opacity: 0.5 }}>{t("point_more_info")}</i>}
                            </div>
                        </InfoWindow>
                    )}
                    {realTimeTrackersForPolylines && realTimeTrackersForPolylines.length > 0 && polylines}
                    {routes && routes.length > 0 && polylines}

                    {/* {<TrafficLayer autoUpdate />  }  */}
                </GoogleMap>
            ) : (
                <Spin style={{ position: "absolute", top: "50%", right: "50%" }} />
            )}
        </div>
    );
};

export default React.memo(GlobalGoogleMap);
