import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polyline } from "@react-google-maps/api";
import "./GlobalMap.scss";
import { ArrowsAltOutlined } from "@ant-design/icons";
import { initGoogleOptions, paletteColorsSVGUrls } from "./initialData";
import blackMarker from "../../assets/img/markers/svg/000000.svg";
import { getAddress } from "../../utils/getAddress";
import { Spin } from "antd";

const GlobalGoogleMap = ({ items, width = "100%", height = "100%", setExpandMap, realTimeTrackers, routes, mapOptions = initGoogleOptions, t, mode }) => {
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

    /* eslint-disable no-console */ //! unused var for tracker realtime
    // console.log(realTimeTrackers);

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        activeMarker && getAddress(activeMarker.trobject_latitude, activeMarker.trobject_longitude, setAddress);
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
                position={{ lat: +el.trobject_latitude, lng: +el.trobject_longitude }}
                title={el.trobject_name}
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
                    position={{ lat: +el.trobject_latitude, lng: +el.trobject_longitude }}
                    title={el.trobject_name}
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

    const polylines = routes?.map((route, key) => (
        <Polyline
            key={key}
            //path={arr.map((val) => ({ lat: val.lat, lng: val.lng }))} //! old
            path={route.coordinates.map((val) => ({ lat: +val[0], lng: +val[1] }))}
            options={{
                strokeColor: route.color, //arr[0].color,
                strokeOpacity: 1.0,
                strokeWeight: 3
            }}
        />
    ));

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(mapOptions.center);
        map.fitBounds(bounds);

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
                        <InfoWindow
                            position={{ lat: +activeMarker.trobject_latitude, lng: +activeMarker.trobject_longitude }}
                            onCloseClick={handleMarkerHoverExit}
                        >
                            <div>
                                <h3>
                                    {activeMarker.trobject_name}
                                    {routesMode && activeMarker.mode === "start" ? 
                                        <i style={{color: "green"}}> ({t("common.start")})</i> 
                                        : routesMode && activeMarker.mode === "finish" ?
                                            <i style={{color: "orange"}}> ({t("common.finish")})</i> : ""}
                                </h3>
                                <p>{address}</p>
                                {activeMarker.trobject_gpsstatus ? t("common.gpsWorking") : t("common.gpsDisabled")}
                                <p>
                                    {activeMarker.trobject_speed} {t("common.kmh")}
                                </p>
                            </div>
                        </InfoWindow>
                    )}
                    {/* /{realTimeTrackers && realTimeTrackers.length > 0 && polylines} */}
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
