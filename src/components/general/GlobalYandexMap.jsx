import React, { useEffect, useState } from "react";
import { Map, Placemark, Polyline } from "@pbe/react-yandex-maps";
import "./GlobalMap.scss";
import { ArrowsAltOutlined } from "@ant-design/icons";
import { getAddressYandex } from "../../utils/getAddress";

const center = [53.902235, 27.561828];

const GlobalYandexMap = ({ items, width = "100%", height = "100%", setExpandMap, realTimeTrackersForPolylines, mode, t = { t }, routes }) => {
    // const [zoom, setZoom] = useState(15);
    // const mapState = useMemo(() => ({ center: [55.75, 37.57], zoom }), [zoom]);
    const routesMode = mode === "routes";

    const [activeMarker, setActiveMarker] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        activeMarker && getAddressYandex(activeMarker.latitude, activeMarker.longitude, setAddress);
    }, [activeMarker]);
    
    const placemarks = routesMode ?
        React.useMemo(() => {
            return items
                .map((item, i) => {
                    return (
                        <Placemark
                            key={i}
                            geometry={[item.latitude, item.longitude]}
                            properties={{
                                balloonContentHeader: `${item.name}
                                <i class="${item.mode === "start" ? "green" : item.mode === "finish" ? "orange" : ""}-text">
                                    ${(item.mode === "start" || item.mode === "finish") ? t(`${item.mode}`) : ""}
                                </i/>`,
                                balloonContentBody: `${address} <br />${!activeMarker?.mode ? `${t("gsm_signal_level")}: ${item.gsmsl || "-"} <br />
                            ${t("satellites")}: ${item.satellites || "-"} <br /> 
                            ${t("speed")}: ${item.speed || "-"} ${t("kmh")}` : `<i class="opacity-half">${t("point_more_info")}</i>`}`
                            }}
                            options={{
                                iconColor: item.color,
                                preset: "islands#greenCircleDotIcon"
                            // iconLayout: "default#image",
                            // iconImageHref: "https://example.com/icon.png" // Set the URL of the icon image
                            }}
                            onClick={() => setActiveMarker(item)}
                        />
                    );
                });
        }, [items, activeMarker, routesMode, t, address])
        : React.useMemo(() => {
            return items
                .filter((el) => el.isVisibleOnMap)
                .map((item) => {
                    return (
                        <Placemark
                            key={item.id}
                            geometry={[item.latitude, item.longitude]}
                            properties={{
                                balloonContentHeader: item.name,
                                balloonContentBody: `${address} <br /> ${t("gsm_signal_level")}: ${item.gsmsl || "-"} <br />
                            ${t("satellites")}: ${item.satellites || "-"} <br /> 
                            ${t("speed")}: ${item.speed || "-"} ${t("kmh")}`,
                                iconCaption: item.name
                            }}
                            options={{
                                iconColor: item.color,
                                preset: "islands#greenCircleDotIcon"
                            // iconLayout: "default#image",
                            // iconImageHref: "https://example.com/icon.png" // Set the URL of the icon image
                            }}
                            onClick={() => setActiveMarker(item)}
                        />
                    );
                }); 
        }, [items, activeMarker, routesMode, t, address]);

    const polylines = routesMode
        ? React.useMemo(() => {
            return routes?.map((route, key) => (
                <Polyline
                    key={key}
                    geometry={route.route_summary.coordinates.map((el) => [+el[0], +el[1]])}
                    options={{
                        balloonCloseButton: false,
                        strokeColor: route.tracker_color,
                        strokeWidth: 3,
                        strokeOpacity: 1
                    }}
                />
            ));
        }, [routes])
        : React.useMemo(() => {
            return (
                realTimeTrackersForPolylines
                    //! для визибл .filter((el) => el.isVisibleOnMap)
                    ?.map((arr, key) => {
                        return (
                            <Polyline
                                key={key}
                                geometry={arr.map((el) => [el.lat, el.lng])}
                                options={{
                                    balloonCloseButton: false,
                                    strokeColor: arr[0].color,
                                    strokeWidth: 3,
                                    strokeOpacity: 1
                                }}
                            />
                        );
                    })
            );
        }, [items]);

    return (
        <div className="map-wrapper" style={{ width, height }}>
            <div className="expand" onClick={() => setExpandMap((prev) => !prev)}>
                <ArrowsAltOutlined />
            </div>

            <Map
                width={"100%"}
                height={"100%"}
                defaultState={{
                    center: center,
                    zoom: 8,
                    controls: ["zoomControl", "fullscreenControl"]
                }}
                options={{
                    autoFitToViewport: "always"
                }}
            >
                {placemarks}
                {realTimeTrackersForPolylines && realTimeTrackersForPolylines.length > 0 && polylines}
                {routes && routes.length > 0 && polylines}

            </Map>
        </div>
    );
};

export default React.memo(GlobalYandexMap);
