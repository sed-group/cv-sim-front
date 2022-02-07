import store from '../store/index';

class VCS {

    static set_active(vcs) {
        store.dispatch('VCS/setActiveVCS', vcs);
    }

    static clear_active() {
        store.dispatch('VCS/clearActiveVCS');
    }

    static add_to_list(vcs) {
        store.dispatch('VCS/addVCSToList', vcs);
    }

    static update_list(vcs_list) {
        store.dispatch('VCS/updateVCSList', vcs_list);
    }

    static clear_list() {
        store.dispatch('VCS/clearVCSList');
    }

}

export default VCS;