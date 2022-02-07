import store from '@/store';

class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.full_name = user.full_name;
    }

    static set_active_user(user) {
        store.dispatch('User/setActiveUser', user);
    }
}

export default User;