import store from '../store/index';

class Subprocesses {

    static add_to_list(subprocess) {
        store.dispatch('Subprocesses/addSubprocessToList', subprocess);
    }

    static update_list(subprocesses) {
        store.dispatch('Subprocesses/updateSubprocessList', subprocesses);
    }

    static clear_list() {
        store.dispatch('Subprocesses/clearSubprocesList');
    }

}

export default Subprocesses;