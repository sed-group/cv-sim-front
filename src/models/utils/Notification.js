import store from '../../store/index';

class Notification {
    static count = 0;

    constructor(type, message) {
        this.type = type;
        this.message = message;
        this.id = Notification.count;

        Notification.count++;
    }

    push() {
        store.dispatch('addNotification', this);
    }

    static emit_standard_error_message() {
        new Notification(
            'error',
            'Something went wrong. Please refresh the page and try again.',
        ).push();
    }

}

export default Notification;