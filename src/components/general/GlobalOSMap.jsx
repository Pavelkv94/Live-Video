import { ArrowsAltOutlined } from "@ant-design/icons";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./GlobalMap.scss";
import L from "leaflet";
import blackMarker from "../../assets/img/markers/png/000000.png";
import { paletteColorsUrls } from "./initialData";

const GlobalOSMap = ({ items, width = "100%", height = "100%", setExpandMap }) => {
    const position = [53.902235, 27.561828]; // [latitude, longitude]

    const markers = items
        .filter((el) => el.isVisibleOnMap)
        .map((el, i) => {
            return (
                <Marker
                    key={i}
                    position={[el.trobject_latitude, el.trobject_longitude]}
                    icon={L.icon({
                        iconUrl: paletteColorsUrls[el.color?.slice(1).toUpperCase()] || blackMarker,
                        iconSize: [40, 40],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34]
                    })}
                >
                    <Popup>{el.id}</Popup>
                </Marker>
            );
        });
    return (
        <div className="map-wrapper" style={{ width, height }}>
            <div className="expand" onClick={() => setExpandMap((prev) => !prev)}>
                <ArrowsAltOutlined />
            </div>

            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
            </MapContainer>
        </div>
    );
};

export default React.memo(GlobalOSMap);
