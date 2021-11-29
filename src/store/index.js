import Vue from 'vue';
import Vuex from 'vuex';

import {ProjectModule} from './project.module';
import {UserModule} from './user.module';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loading: false,
        loadingMessage: null,
        notifications: [],
    },

    mutations: {
        SET_STATE_LOADING(state, message) {
            state.loading = true;
            if (message) {
                state.loadingMessage = message;
            } else {
                state.loadingMessage = 'This might take a while..';
            }
        },

        CLEAR_STATE_LOADING(state) {
            state.loading = false;
            state.loadingMessage = 'This might take a while..';
        },

        ADD_NOTIFICATION(state, notification) {
            state.notifications.push(notification);
        },

        REMOVE_NOTIFICATION(state, notificationID) {
            for (let i = 0; i < state.notifications.length; i++) {
                const notification = state.notifications[i];
                if (notification.id === notificationID) {
                    state.notifications.splice(i, 1);
                    break;
                }
            }
        },

        CLEAR_NOTIFICATIONS(state) {
            state.notifications = [];
        },

    },

    actions: {
        setStateLoading({commit}, message) {
            commit('SET_STATE_LOADING', message);
        },

        clearStateLoading({commit},) {
            commit('CLEAR_STATE_LOADING');
        },

        addNotification({commit}, notification) {
            commit('ADD_NOTIFICATION', notification);
        },

        removeNotification({commit}, notificationID) {
            commit('REMOVE_NOTIFICATION', notificationID);
        },

        clearNotifications({commit}) {
            commit('CLEAR_NOTIFICATIONS');
        },
    },

    modules: {
        Project: ProjectModule,
        User: UserModule,
    },
});

export default store;
