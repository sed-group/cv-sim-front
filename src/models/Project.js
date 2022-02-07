import User from './User';
import store from '@/store';

class Project {
    constructor(project) {
        this.id = project.id;
        this.name = project.name;
        this.description = project.description;
        this.owner = new User(project.owner);
        this.datetime_created = Date.parse(project.datetime_created);
    }

    static set_active(project) {
        store.dispatch('Project/setActiveProject', project);
    }

    static clear_active() {
        store.dispatch('Project/clearActiveProject');
    }

    static add_to_list(project) {
        store.dispatch('Project/addProjectToList', project);
    }

    static update_list(projects) {
        store.dispatch('Project/updateProjectList', projects);
    }

    static clear_list() {
        store.dispatch('Project/clearProjectList');
    }


}

export default Project;