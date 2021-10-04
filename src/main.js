import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import vuetify from './plugins/vuetify';

// Automatically login user if user has a token
const token = localStorage.getItem('token');
if (token) {
    store.dispatch('User/setLoggedIn', true);
    axios.defaults.headers.common['Authorization'] = token;
}

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
    axios,
    store,
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app');

// API default config
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = store.state.User.token;
    return config;
})


