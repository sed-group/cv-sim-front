class User {
    constructor(dbUserObject) {
        this.id = dbUserObject.id;
        this.username = dbUserObject.username;
        this.email = dbUserObject.email;
        this.full_name = dbUserObject.full_name;
    }
}

export default User;