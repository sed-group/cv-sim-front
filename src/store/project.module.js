export const ProjectModule = {
    namespaced: true,

    state: {
        project: null,
    },

    mutations: {
        SET_PROJECT(state, project) {
            state.project = project;
        },
        SET_PROJECT_ARCHETYPE(state, archetypeID) {
            if (!state.project) return;
            state.project.archetypeID = archetypeID;
        },
    },

    actions: {
        async setProject({commit}, project) {
            commit('SET_PROJECT', project)

        },
        async setProjectArchetype({commit}, archetypeID) {
            commit('SET_PROJECT_ARCHETYPE', archetypeID);
        },
    },
}
