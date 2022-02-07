export const NotificationModule = {
    namespaced: true,

    state: {
        notifications: [],
    },

    mutations: {
        ADD_NOTIFICATION(state, notification) {
            state.notifications.push(notification);
        },
        REMOVE_NOTIFICATION(state, notification_id) {
            state.notifications = state.notifications.filter(item => item.id !== notification_id);
        },
        CLEAR_NOTIFICATIONS(state) {
            state.notifications = [];
        },
    },

    actions: {
        addNotification({commit}, notification) {
            commit('ADD_NOTIFICATION', notification);
        },
        removeNotification({commit}, notification_id) {
            commit('REMOVE_NOTIFICATION', notification_id);
        },
        clearNotifications({commit}) {
            commit('CLEAR_NOTIFICATIONS');
        },

        logOut({dispatch}) {
            dispatch('clearNotifications');
        },
    },
};
