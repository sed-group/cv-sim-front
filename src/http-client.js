import axios from 'axios';
import store from './store'

import Notification from './models/utils/Notification'
import AuthService from './services/auth.service';


const httpClient = () => {

    const defaultOptions = {
        baseURL: 'http://localhost:8000/api/',
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    })

    instance.interceptors.response.use((response) => {
        return response;
    }, (err) => {
        if (err.response.status === 401) {
            AuthService.logout();
            return err;
        } else {
            console.error(err.stack);
        }

        // Create a notification. Try to get response detail message.
        let message = err.message;
        try {
            if (err.response.data.detail) {
                message = err.response.data.detail;
            }
        } finally {
            const notification = new Notification('error', message);
            store.dispatch('addNotification', notification);
        }

        return err;
    });

    return instance;
};

export default httpClient();