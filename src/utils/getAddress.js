
import Geocode from "react-geocode";

export const getAddress = (lat, lng, setData) => {
    Geocode.fromLatLng(lat, lng)
        .then((response) => {
            const address = response.results[0].formatted_address;
            setData(address);
        })
        .catch((error) => {
        /* eslint-disable no-console */
            console.error(error);
        });
};