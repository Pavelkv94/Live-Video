import Geocode from "react-geocode";

//GOOGLE
export const getAddressGoogle = (lat, lng, setData) => {
    Geocode.fromLatLng(lat, lng)
        .then((response) => {
            const address = response.results[2].formatted_address;
            setData(address);
        })
        .catch((error) => {
            /* eslint-disable no-console */
            console.error(error);
        });
};


export const getAddressGoogleAndSetWaypoint = (lat, lng, callback, id) => {
    Geocode.fromLatLng(lat, lng)
        .then((response) => {
            const address = response.results[2].formatted_address;
            callback(id, address);
        })
        .catch((error) => {
            /* eslint-disable no-console */
            console.error(error);
        });
};

export const getAddressGoogleAndSetMovement = (lat, lng, id, datetime, field, callback) => {
    Geocode.fromLatLng(lat, lng)
        .then((response) => {
            const address = response.results[2].formatted_address;
            callback(id, address, datetime, field);
        })
        .catch((error) => {
            /* eslint-disable no-console */
            console.error(error);
        });
};

//YANDEX
export const getAddressYandex = async (lat, lng, setData) => {
    try {
        const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${lng},${lat}&apikey=${import.meta.env.VITE_YANDEX_MAP_API_KEY}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
        setData(address);
        return address;
    } catch (error) {
        console.error("Error fetching address:", error.message);
        return null;
    }
};

export const getAddressYandexAndSetWaypoint = async (lat, lng, callback, id) => {
    try {
        const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${lng},${lat}&apikey=${import.meta.env.VITE_YANDEX_MAP_API_KEY}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
        callback(id, address);
        return address;
    } catch (error) {
        console.error("Error fetching address:", error.message);
        return null;
    }
};


export const getAddressYandexAndSetMovement = async (lat, lng, id, datetime, field, callback) => {
    try {
        const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${lng},${lat}&apikey=${import.meta.env.VITE_YANDEX_MAP_API_KEY}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
        callback(id, address, datetime, field);
        return address;
    } catch (error) {
        console.error("Error fetching address:", error.message);
        return null;
    }
};