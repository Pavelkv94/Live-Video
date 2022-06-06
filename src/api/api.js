import axios from "axios";


const base = async (url, subUrl) => `https://quiet-river.icdc.zby.icdc.io/api/v1/${url}/${subUrl}`;

const expandHeaders = async () => ({

});

const API = {
    get: (url, headers = {}, params = {}) => {
        return axios.get(url, {
            headers,
            params,
        });
    },
    put(url, headers = {}, data = {}) {
        return axios.put(url, data, {
            headers,
        });
    },
    post(url, headers = {}, data = {}) {
        return axios.post(url, data, {
            headers,
        });
    },
    delete(url, headers = {}) {
        return axios.delete(url, {
            headers,
        });
    },
};

export const fetchData = async (url, headers, payload, subUrl) => {
    const response = await API.get(await base(url, subUrl), expandHeaders(headers), payload);
    return response.data;
};

export const createData = async (url, headers, payload, subUrl) => {
    const response = await API.post(await base(url, subUrl), expandHeaders(headers), payload);
    return response.data;
};

export const updateData = async (url, headers, payload, subUrl) => {
    const response = await API.put(await base(url, subUrl), payload, headers);
    return response.data;
};

export const deleteData = async (url, headers, subUrl) => {
    const response = await API.delete(await base(url, subUrl), expandHeaders(headers));
    return response.data;
};