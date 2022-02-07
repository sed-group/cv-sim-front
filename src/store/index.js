import Vue from 'vue';
import Vuex from 'vuex';

import {NotificationModule} from '@/store/notification.module';
import {ProjectModule} from '@/store/project.module';
import {UserModule} from '@/store/user.module';
import {ValueDriverModule} from '@/store/value_driver.module';
import {VCSModule} from '@/store/vcs.module';
import {SubprocessModule} from '@/store/subprocesses.module';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loading: false,
        loadingMessage: null,

        vcs_table: undefined,
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
    },

    actions: {
        setStateLoading({commit}, message) {
            commit('SET_STATE_LOADING', message);
        },
        clearStateLoading({commit}) {
            commit('CLEAR_STATE_LOADING');
        },

        logOut({dispatch}) {
            dispatch('Notifications/logOut');
            dispatch('Project/logOut');
            dispatch('User/logOut');
            dispatch('ValueDrivers/logOut');
            dispatch('VCS/logOut');
            dispatch('Subprocesses/logOut');
        },
    },

    modules: {
        Notifications: NotificationModule,
        Project: ProjectModule,
        User: UserModule,
        ValueDrivers: ValueDriverModule,
        VCS: VCSModule,
        Subprocesses: SubprocessModule,
    },

});

export default store;
