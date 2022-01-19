import store from '../store/index';

class Subprocesses {

    constructor(subprocesses = []) {
        this.subprocesses = subprocesses;
    }

    push() {
        store.dispatch('updateSubprocesses', this.subprocesses);
    }

    static clear() {
        store.dispatch('clearSubprocesses');
    }

}

export default Subprocesses;