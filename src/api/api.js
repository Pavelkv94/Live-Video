import axios from "axios";


const base = async (url) => `https://quiet-river.icdc.zby.icdc.io/api/v1/${url}`;

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

export const fetchData = async (url, headers, payload) => {
    const response = await API.get(await base(url), expandHeaders(headers), payload);
    return response.data;
};

export const createData = async (url, headers, payload) => {
    const response = await API.post(await base(url), expandHeaders(headers), payload);
    return response.data;
};

export const updateData = async (url, headers, payload) => {
    const response = await API.put(await base(url), expandHeaders(headers), payload);
    return response.data;
};

export const deleteData = async (url, headers) => {
    const response = await API.delete(await base(url), expandHeaders(headers));
    return response.data;
};