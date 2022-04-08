export const VCSModule = {
    namespaced: true,

    state: {
        active_vcs: null,
        vcs_list: [],
    },

    mutations: {
        SET_ACTIVE_VCS(state, vcs) {
            state.active_vcs = undefined; // to retrigger when same VCS is set as active
            state.active_vcs = vcs;
        },
        CLEAR_ACTIVE_VCS(state) {
            state.active_vcs = null;
        },

        ADD_VCS_TO_LIST(state, vcs) {
            state.vcs_list.push(vcs);
        },
        UPDATE_VCS_LIST(state, vcss) {
            state.vcs_list = vcss;
        },
        CLEAR_VCS_LIST(state) {
            state.vcs_list = [];
        },
    },

    actions: {
        setActiveVCS({commit}, vcs) {
            commit('SET_ACTIVE_VCS', vcs);
        },
        clearActiveVCS({commit}) {
            commit('CLEAR_ACTIVE_VCS');
        },

        addVCSToList({commit}, vcs) {
            commit('ADD_VCS_TO_LIST', vcs);
        },
        updateVCSList({commit}, vcss) {
            commit('UPDATE_VCS_LIST', vcss);
        },
        clearVCSList({commit}) {
            commit('CLEAR_VCS_LIST');
        },

        logOut({commit}) {
            commit('CLEAR_ACTIVE_VCS');
            commit('CLEAR_VCS_LIST');
        },
    },

};
