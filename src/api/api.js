import axios from "axios";

axios.defaults.withCredentials = true;

const apiUrl = import.meta.env.VITE_SERVICE_DOMAIN || "http://api.oms.io";

const base = async (url) => `${apiUrl}/api/v1/${url}`;

const expandHeaders = (headers) => {
    return ({...headers});
};

const API = {
    get: (url, headers = {}, params = {}) => {
        return axios.get(url, {
            headers,
            params
        });
    },
    put(url, headers = {}, data = {}) {
        return axios.put(url, data, {
            headers
        });
    },
    patch(url, headers = {}, data = {}, params) {
        return axios.patch(url, data, {
            headers,
            params
        });
    },
    post(url, headers = {}, data = {}) {
        return axios.post(url, data, {
            headers
        });
    },
    delete(url, headers = {}) {
        return axios.delete(url, {
            headers
        });
    }
};

export const fetchData = async (url, headers, payload) => {
    const response = await API.get(await base(url), expandHeaders(headers), {...payload});
    return response.data;
};

export const createData = async (url, headers, payload) => {
    const response = await API.post(await base(url), expandHeaders(headers), {...payload});
    return response;
};

export const updateData = async (url, headers, payload) => {
    const response = await API.put(await base(url), expandHeaders(headers), {...payload});
    return response.data;
};

export const patchData = async (url, headers, payload) => {
    const response = await API.patch(await base(url), expandHeaders(headers), {...payload});
    return response.data;
};

export const deleteData = async (url, headers) => {
    const response = await API.delete(await base(url), expandHeaders(headers));
    return response.data;
};

export const createWithFile = async (url, headers, payload) => {

    const formData = new FormData();
    formData.append("picture", payload.picture);
    formData.append("name", payload.name);
    formData.append("description", payload.description);

    const response = await API.post(await base(url), expandHeaders(headers), formData);
    return response.data;
};

export const updateWithFile = async (url, headers, payload) => {

    const formData = new FormData();
    formData.append("picture", payload.picture);
    formData.append("name", payload.name);
    formData.append("description", payload.description);

    const response = await API.patch(await base(url), expandHeaders(headers), formData);
    return response.data;
};