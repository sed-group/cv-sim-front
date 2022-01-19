import axios from 'axios';
import store from './store';
import router from './router';

import Notification from './models/utils/Notification';
import AuthService from './services/auth.service';


const httpClient = () => {

    const defaultOptions = {
        baseURL: 'http://localhost:8000/api/',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    instance.interceptors.response.use((response) => {
        return response;
    }, err => {
        if (!!err.response) {
            if (err.response.status === 401) {
                AuthService.logout();
                router.push({name: 'Home'});
                new Notification('error', 'Session expired. Please log in again.', 10000).push();
                return;
            } else {
                console.error(err.stack);
            }
        }

        // Create a notification. Try to get response detail message.
        let message = err.message;
        try {
            if (err.response.data.detail) {
                message = err.response.data.detail;
            }
        } finally {
            new Notification('error', message).push();
        }

        return err;
    });

    return instance;
};

export default httpClient();