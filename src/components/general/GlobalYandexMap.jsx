import React from "react";
import { Map, Placemark, Polyline } from "@pbe/react-yandex-maps";
import "./GlobalMap.scss";
import { ArrowsAltOutlined } from "@ant-design/icons";

const center = [53.902235, 27.561828];

const GlobalYandexMap = ({ items, width = "100%", height = "100%", setExpandMap, realTimeTrackers }) => {
    // const [zoom, setZoom] = useState(15);
    // const mapState = useMemo(() => ({ center: [55.75, 37.57], zoom }), [zoom]);

    const placemarks = React.useMemo(() => {
        return items
            .filter((el) => el.isVisibleOnMap)
            .map((item) => {
                return (
                    <Placemark
                        key={item.trobject_id}
                        geometry={[item.trobject_latitude, item.trobject_longitude]}
                        properties={{
                            balloonContent: item.trobject_name
                        }}
                        options={{
                            iconColor: item.color // Set the color of the icon to red
                            // iconLayout: "default#image",
                            // iconImageHref: "https://example.com/icon.png" // Set the URL of the icon image
                        }}
                    />
                );
            });
    }, [items]);

    const polylines = React.useMemo(() => {
        return (
            realTimeTrackers
                //! для визибл .filter((el) => el.isVisibleOnMap)
                ?.map((arr, key) => {
                    return (
                        <Polyline
                            key={key}
                            geometry={arr.map(el => [el.lat, el.lng])
                            }
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
                    zoom: 15,
                    controls: ["zoomControl", "fullscreenControl"]
                }}
            >
                {placemarks}
                {realTimeTrackers && realTimeTrackers.length > 0 && polylines}
            </Map>
        </div>
    );
};

export default React.memo(GlobalYandexMap);
