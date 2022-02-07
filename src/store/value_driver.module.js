export const ValueDriverModule = {
    namespaced: true,

    state: {
        value_driver_list: [],
    },

    mutations: {
        ADD_VALUE_DRIVER_TO_LIST(state, value_driver) {
            state.value_driver_list.push(value_driver);
        },
        UPDATE_VALUE_DRIVER_LIST(state, value_driver_list) {
            state.value_driver_list = value_driver_list;
        },
        CLEAR_VALUE_DRIVER_LIST(state) {
            state.value_driver_list = [];
        },
    },

    actions: {
        addValueDriverToList({commit}, value_driver) {
            commit('ADD_VALUE_DRIVER_TO_LIST', value_driver);
        },
        updateValueDriverList({commit}, value_driver_list) {
            commit('UPDATE_VALUE_DRIVER_LIST', value_driver_list);
        },
        clearValueDriverList({commit}) {
            commit('CLEAR_VALUE_DRIVER_LIST');
        },

        logOut({commit}) {
            commit('CLEAR_VALUE_DRIVER_LIST');
        },
    },

};
