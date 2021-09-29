import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');

// API default config
axios.interceptors.request.use(function (config) {
    const token = store.state.User.token;
    config.headers.Authorization = token;
    return config;
})

// Automatically login user if user has a token
const token = localStorage.getItem('token');
if (token) {
    store.dispatch('User/setLoggedIn', true);
}
