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

        user: null,
        project: null,
        value_drivers: [],
        subprocesses: [],
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

        REMOVE_NOTIFICATION(state, notification_id) {
            for (let i = 0; i < state.notifications.length; i++) {
                const notification = state.notifications[i];
                if (notification.id === notification_id) {
                    state.notifications.splice(i, 1);
                    break;
                }
            }
        },

        CLEAR_NOTIFICATIONS(state) {
            state.notifications = [];
        },

        UPDATE_VALUE_DRIVERS(state, value_drivers) {
            state.value_drivers = value_drivers;
        },

        CLEAR_VALUE_DRIVERS(state) {
            state.value_drivers = [];
        },

        UPDATE_SUBPROCESSES(state, subprocesses) {
            state.subprocesses = subprocesses;
        },

        CLEAR_SUBPROCESSES(state) {
            state.subprocesses = [];
        },

    },

    actions: {
        setStateLoading({commit}, message) {
            commit('SET_STATE_LOADING', message);
        },

        clearStateLoading({commit}) {
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

        updateValueDrivers({commit}, value_drivers) {
            commit('UPDATE_VALUE_DRIVERS', value_drivers);
        },

        clearValueDrivers({commit}) {
            commit('CLEAR_VALUE_DRIVERS');
        },

        updateSubprocesses({commit}, subprocesses) {
            commit('UPDATE_SUBPROCESSES', subprocesses);
        },

        clearSubprocesses({commit}) {
            commit('CLEAR_SUBPROCESSES');
        },

        clearAllLogOut({commit}) {
            commit('CLEAR_NOTIFICATIONS');
            commit('CLEAR_VALUE_DRIVERS');
            commit('CLEAR_SUBPROCESSES');
        },
    },

    modules: {
        Project: ProjectModule,
        User: UserModule,
    },
});

export default store;
