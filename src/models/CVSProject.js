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

    get_date_created_as_string() {
        return new Intl.DateTimeFormat('en-GB', {dateStyle: 'short', timeStyle: 'short'}).format(this.dateCreated);
    }

    async get_owner() {
        let owner = null;
        if (this.ownerID) {
            const userData = await UserService.getUser(this.ownerID);
            owner = new User(userData);
        }
        return owner;
    }
}

export default CVSProject;