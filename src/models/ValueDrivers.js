import store from '../store/index';

class ValueDrivers {

    static add_to_list(value_driver) {
        store.dispatch('ValueDrivers/addValueDriverToList', value_driver);
    }

    static update_list(value_drivers) {
        store.dispatch('ValueDrivers/updateValueDriverList', value_drivers);
    }

    static clear_list() {
        store.dispatch('ValueDrivers/clearValueDriverList');
    }

}

export default ValueDrivers;