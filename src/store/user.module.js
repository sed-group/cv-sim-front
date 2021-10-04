export const UserModule = {
    namespaced: true,

    state: {
        user: null,
        loggedIn: false,
    },

    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_LOGGED_IN(state, loggedIn) {
            state.loggedIn = loggedIn;
        }
    },

    actions: {
        setUser({commit}, user) {
            commit('SET_USER', user);
        },
        setLoggedIn({commit}, loggedIn) {
            commit('SET_LOGGED_IN', loggedIn);
        }
    },
}