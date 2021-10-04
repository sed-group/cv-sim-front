class RangeParameter {

    constructor (dbParameterObject) {
        // Parameter fields
        this.id = dbParameterObject.id;
        this.name = dbParameterObject.name;
        this.value = dbParameterObject.value;
        this.type = dbParameterObject.type;

        // Range specific fields
        this.lowerLimit = dbParameterObject.lowerLimit;
        this.upperLimit = dbParameterObject.upperLimit;
        this.ignore = dbParameterObject.ignore;
    }
}

export default RangeParameter;