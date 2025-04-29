import axios from "axios";
import {ACCESS_TOKEN_KEY} from "../config/LocalstorageKeys.ts";

const http = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default http;
