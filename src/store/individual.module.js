export const IndividualModule = {
    namespaced: true,

    state: {
        archetype: null,
        individualCount: 0,
    },

    mutations: {
        SET_ARCHETYPE(state, archetype) {
            state.archetype = archetype;
        },
        ADD_PARAMETER(state, parameter) {
            state.archetype.parameters.push(parameter);
        },
        REMOVE_PARAMETER(state, parameterID) {
            for (let i = 0; i < state.archetype.parameters.length; i++) {
                const parameter = state.archetype.parameters[i];
                if (parameter.id !== parameterID) continue;
                state.archetype.parameters.splice(i, 1);
                break;
            }
        },
        SET_INDIVIDUAL_COUNT(state, count) {
            state.individualCount = count;
        },
        RESET_INDIVIDUAL_COUNT(state) {
            state.individualCount = 0;
        },
    },

    actions: {
        setArchetype({commit}, archetype) {
            commit('SET_ARCHETYPE', archetype);
        },
        addParameter({commit}, parameter) {
            commit('ADD_PARAMETER', parameter);
        },
        removeParameter({commit}, parameterID) {
            commit('REMOVE_PARAMETER', parameterID);
        },
        setIndividualCount({commit}, count) {
            commit('SET_INDIVIDUAL_COUNT', count);
        },
        resetIndividualCount({commit}) {
            commit('RESET_INDIVIDUAL_COUNT');
        },
    },
}
