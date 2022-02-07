export const SubprocessModule = {
    namespaced: true,

    state: {
        subprocess_list: [],
    },

    mutations: {
        ADD_SUBPROCESS_TO_LIST(state, subprocess) {
            state.subprocess_list.push(subprocess);
        },
        UPDATE_SUBPROCESSS(state, subprocess_list) {
            state.subprocess_list = subprocess_list;
        },
        CLEAR_SUBPROCESSS_LIST(state) {
            state.subprocess_list = [];
        },
    },

    actions: {
        addSubprocessToList({commit}, subprocess) {
            commit('ADD_SUBPROCESS_TO_LIST', subprocess);
        },
        updateSubprocessList({commit}, subprocess_list) {
            commit('UPDATE_SUBPROCESSS', subprocess_list);
        },
        clearSubprocesList({commit}) {
            commit('CLEAR_SUBPROCESSS_LIST');
        },

        logOut({dispatch}) {
            dispatch('clearSubprocesList');
        },
    },

};
