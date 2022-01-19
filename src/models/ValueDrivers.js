import store from '../store/index';

class ValueDrivers {

    constructor(value_drivers = []) {
        this.value_drivers = value_drivers;
    }

    push() {
        store.dispatch('updateValueDrivers', this.value_drivers);
    }

    static clear() {
        store.dispatch('clearValueDrivers');
    }

}

export default ValueDrivers;