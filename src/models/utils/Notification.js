import store from '@/store/index';

class Notification {
    static count = 0;

    constructor(type, message, settings = {}) {

        // Setting given or default values
        const timeout = settings.hasOwnProperty('timeout') ? settings.timeout : undefined;
        const closeable = settings.hasOwnProperty('closeable') ? settings.closeable : true;

        this.type = type; // one of the following: [success, error, info, warning]
        this.message = message; //  the message of the notification
        this.timeout = timeout; // an automatic closing time [ms]
        this.closeable = closeable; // boolean value indicating possibility for user to close notification
        this.id = Notification.count;

        Notification.count++;
    }

    push() {
        store.dispatch('Notifications/addNotification', this);
    }

    static emit_standard_error_message() {
        new Notification(
            'error',
            'Something went wrong. Please refresh the page and try again.',
        ).push();
    }

}

export default Notification;