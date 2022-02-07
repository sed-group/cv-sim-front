import httpClient from '@/http-client';
import store from '@/store/index';
import User from '@/models/User';
import router from '@/router';

const API_EXTENSION = 'core/auth/';

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
                if (response.data.access_token) {
                    localStorage.setItem('token', response.data.access_token);
                    store.dispatch('User/setLoggedIn', true);
                    httpClient.get('core/users/me', bodyFormData, {headers: headers})
                        .then(response => {
                            store.dispatch('User/setActiveUser', new User(response.data));
                        });
                }
            });
    }

    logout() {
        localStorage.removeItem('token');
        store.dispatch('logOut');
        router.push({name: 'Home'});
    }
}

export default new AuthService();
