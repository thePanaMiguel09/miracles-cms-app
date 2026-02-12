import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_ULR,
});


api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        console.log('Token',token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (error) => Promise.reject(error)
);