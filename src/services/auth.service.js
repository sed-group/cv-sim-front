import httpClient from '../http-client'
import store from './../store/index'

const API_EXTENSION = 'core/auth/'

class AuthService {
    login(authData) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        let bodyFormData = new FormData();
        bodyFormData.append('username', authData.username);
        bodyFormData.append('password', authData.password);

        return httpClient.post(API_EXTENSION + 'token', bodyFormData, {headers: headers})
            .then(response => {
                console.log(response)
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                    store.dispatch('User/setLoggedIn', true);
                }
            });
    }

    logout() {
        localStorage.removeItem('token');
        store.dispatch('User/setLoggedIn', false);
        store.dispatch('clearNotifications');
    }
}

export default new AuthService();
