import httpClient from '../http-client';

const API_EXTENSION = 'core/users/';

class UserService {
    async getUser(userID) {
        const resp = await httpClient.get(API_EXTENSION + `${userID}`);
        return resp.data;
    }

    async getMe() {
        const resp = await httpClient.get(API_EXTENSION + 'me/');
        return resp.data;
    }
}

export default new UserService();
