import UserService from '../services/user.service';
import User from './User';

class CVSProject {
    constructor(dbProjectObject) {
        this.id = dbProjectObject.id;
        this.name = dbProjectObject.name;
        this.description = dbProjectObject.description;
        this.owner = new User(dbProjectObject.owner);
        this.datetime_created = Date.parse(dbProjectObject.datetime_created);
    }
}

export default CVSProject;