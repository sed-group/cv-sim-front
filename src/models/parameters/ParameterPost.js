class ParameterPost {
    constructor (individualID, name, value, type=null) {
        this.individualID = individualID;
        this.name = name;
        this.value = value;
        this.type = type;
    }
}

export default ParameterPost;