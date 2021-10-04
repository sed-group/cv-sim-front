class RangeParameterPost {

    constructor (parameterID, lowerLimit, upperLimit, ignore) {
        this.parameterID = parameterID
        this.lowerLimit = lowerLimit;
        this.upperLimit = upperLimit;
        this.ignore = ignore;
    }
}

export default RangeParameterPost;