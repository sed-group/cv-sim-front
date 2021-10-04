class Parameter {
    constructor (dbParameterObject) {
        this.id = dbParameterObject.id;
        this.name = dbParameterObject.name;
        this.value = dbParameterObject.value;
        this.type = dbParameterObject.type;
    }
}

export default Parameter;