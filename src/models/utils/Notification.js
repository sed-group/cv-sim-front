import store from '../../store/index'

class Notification {
    static count = 0
    constructor (type, message) {
        this.type = type;
        this.message = message;
        this.id = Notification.count;

        Notification.count++;
    }

    push () {
        store.dispatch('addNotification', this)
    }
}

export default Notification