import axios from "axios";
import queryString from "query-string"

const BASE_URL = process.env.NODE_ENV !== "production" ? "http://localhost:5000/api/v1/" : "";


const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "content-type": "application/json"
    },
    paramsSerializer: params => queryString.stringify(params)
});

export const setAuthToken = token => {
    if (token) {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosClient.defaults.headers.common["Authorization"];
    }
}

export const addHeaders = newHeaders => {
    axiosClient.defaults.headers = { ...axiosClient.defaults.headers, ...newHeaders };
}

export default axiosClient;