export const UserModule = {
    namespaced: true,

    state: {
        active_user: null,
        logged_in: false,
    },

    mutations: {
        SET_ACTIVE_USER(state, user) {
            state.active_user = user;
        },
        CLEAR_ACTIVE_USER(state) {
            state.active_user = null;
        },
        SET_LOGGED_IN(state, loggedIn) {
            state.logged_in = loggedIn;
        },
    },

    actions: {
        setActiveUser({commit}, user) {
            commit('SET_ACTIVE_USER', user);
        },
        clearActiveUser({commit}) {
            commit('CLEAR_ACTIVE_USER');
        },
        setLoggedIn({commit}, loggedIn) {
            commit('SET_LOGGED_IN', loggedIn);
        },

        logOut({dispatch}) {
            dispatch('clearActiveUser');
            dispatch('setLoggedIn', false);
        },
    },
};