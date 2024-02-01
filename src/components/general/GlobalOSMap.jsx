import { ArrowsAltOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Marker, Polyline, Popup, useMap } from "react-leaflet";
import "./GlobalMap.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import blackMarker from "../../assets/img/markers/png/000000.png";
import { paletteColorsUrls } from "./initialData";
import "leaflet/dist/leaflet.css";
import { getAddressGoogle } from "../../utils/getAddress";

const GlobalOSMap = ({ items, width = "100%", height = "100%", setExpandMap, mode, t, realTimeTrackersForPolylines, routes }) => {
    const position = [53.902235, 27.561828];
    const routesMode = mode === "routes";

    const [activeMarker, setActiveMarker] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        activeMarker && getAddressGoogle(activeMarker.latitude, activeMarker.longitude, setAddress);
    }, [activeMarker]);

    const markers = routesMode ? items
        .map((el, i) => {
            return (
                <Marker
                    key={i}
                    position={[+el.latitude, +el.longitude]}
                    icon={L.icon({
                        iconUrl: paletteColorsUrls[el.color?.slice(1).toUpperCase()] || blackMarker,
                        iconSize: [40, 40],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34]
                    })}
                    eventHandlers={{
                        click: () => setActiveMarker(el)
                    }}
                >
                    <Popup>
                        <div>
                            <h3 style={{ margin: "8px 0" }}>
                                {el["name"]}
                                {routesMode && activeMarker?.mode === "start" ? (
                                    <i style={{ color: "green" }}> ({t("start")})</i>
                                ) : routesMode && activeMarker?.mode === "finish" ? (
                                    <i style={{ color: "orange" }}> ({t("finish")})</i>
                                ) : (
                                    ""
                                )}
                            </h3>
                            <p style={{ margin: "0 0 6px 0" }}>{address}</p>
                            {!activeMarker?.mode && routesMode &&  `${t("gsm_signal_level")}: ${activeMarker?.gsmsl || "-"}`}
                            {!activeMarker?.mode && <br />}
                            {!activeMarker?.mode && `${t("satellites")}: ${activeMarker?.satellites || "-"}`}
                            {!activeMarker?.mode && <p style={{ margin: "0" }}>{`${t("speed")}: ${activeMarker?.speed || "-"} ${t("kmh")}`}</p>}
                            {activeMarker?.mode && <i style={{ margin: "0", opacity: 0.5 }}>{t("point_more_info")}</i>}
                        </div>
                    </Popup>
                </Marker>
            );
        }) : items
        .filter((el) => el.isVisibleOnMap)
        .map((el, i) => {
            return (
                <Marker
                    key={i}
                    position={[+el.latitude, +el.longitude]}
                    icon={L.icon({
                        iconUrl: paletteColorsUrls[el.color?.slice(1).toUpperCase()] || blackMarker,
                        iconSize: [40, 40],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34]
                    })}
                    eventHandlers={{
                        click: () => setActiveMarker(el)
                    }}
                >
                    <Popup>
                        <div>
                            <h3 style={{ margin: "8px 0" }}>
                                {el["name"]}
                                {routesMode && activeMarker?.mode === "start" ? (
                                    <i style={{ color: "green" }}> ({t("start")})</i>
                                ) : routesMode && activeMarker?.mode === "finish" ? (
                                    <i style={{ color: "orange" }}> ({t("finish")})</i>
                                ) : (
                                    ""
                                )}
                            </h3>
                            <p style={{ margin: "0 0 6px 0" }}>{address}</p>
                            {!activeMarker?.mode && routesMode &&  `${t("gsm_signal_level")}: ${activeMarker?.gsmsl || "-"}`}
                            {!activeMarker?.mode && <br />}
                            {!activeMarker?.mode && `${t("satellites")}: ${activeMarker?.satellites || "-"}`}
                            {!activeMarker?.mode && <p style={{ margin: "0" }}>{`${t("speed")}: ${activeMarker?.speed || "-"} ${t("kmh")}`}</p>}
                            {activeMarker?.mode && <i style={{ margin: "0", opacity: 0.5 }}>{t("point_more_info")}</i>}
                        </div>
                    </Popup>
                </Marker>
            );
        });

    const polylines = routesMode ? routes.map((route, i) => (
        <Polyline key={i} pathOptions={{ color: route.tracker_color }} positions={route.route_summary.coordinates} />
    )) : realTimeTrackersForPolylines.map((line, i) => (
        <Polyline key={i} pathOptions={{ color: line[0].color }} positions={line.map((el) => [el.lat, el.lng])} />
    ));

    return (
        <div className="map-wrapper" style={{ width, height }} >
            <div className="expand" onClick={() => setExpandMap((prev) => !prev)}>
                <ArrowsAltOutlined />
            </div>

            <MapContainer center={position} zoom={6} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
                {realTimeTrackersForPolylines && realTimeTrackersForPolylines.length > 0 && polylines}
                {routes && routes.length > 0 && polylines}
                <ResizeMapComponent width={width} height={height}/>
            </MapContainer>
        </div>
    );
};

export default React.memo(GlobalOSMap);

function ResizeMapComponent({width, height}) {
    const map = useMap();
    useEffect(() => {
        // Call invalidateSize when the component mounts and when the expand state changes
        map.invalidateSize();
    }, [map, width, height]); 

    return null;
}