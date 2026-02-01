import axios from "axios";
import { useAuth } from "@/app/store/auth";

const api = axios.create({
    baseURL: "http://localhost",
});

api.interceptors.request.use((config) => {
    const { token } = useAuth.getState();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;