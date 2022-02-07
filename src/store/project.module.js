export const ProjectModule = {
    namespaced: true,

    state: {
        active_project: null,
        project_list: [],
    },

    mutations: {
        SET_ACTIVE_PROJECT(state, project) {
            state.active_project = project;
        },
        CLEAR_ACTIVE_PROJECT(state) {
            state.active_project = null;
        },

        ADD_PROJECT_TO_LIST(state, project) {
            state.project_list.push(project);
        },
        UPDATE_PROJECT_LIST(state, project_list) {
            state.project_list = project_list;
        },
        CLEAR_PROJECT_LIST(state) {
            state.project_list = [];
        },
    },

    actions: {
        setActiveProject({commit}, project) {
            commit('SET_ACTIVE_PROJECT', project);
        },
        clearActiveProject({commit}) {
            commit('CLEAR_ACTIVE_PROJECT');
        },

        addProjectToList({commit}, project) {
            commit('ADD_PROJECT_TO_LIST', project);
        },
        updateProjectList({commit}, project_list) {
            commit('UPDATE_PROJECT_LIST', project_list);
        },
        clearProjectList({commit}) {
            commit('CLEAR_PROJECT_LIST');
        },

        logOut({dispatch}) {
            dispatch('clearActiveProject');
            dispatch('clearProjectList');
        },
    },

};
