class MeasurementResult {
    constructor (dbObject, setID=null) {
        this.id = dbObject.id
        this.measurementID = dbObject.measurement_id
        this.individualID = dbObject.individual_id
        this.value = dbObject.value
        this.type = dbObject.type
        this.dateInsert = Date.parse(dbObject.insert_timestamp)
        this.dateMeasurement = Date.parse(dbObject.measurement_timestamp)
        this.setID = setID
    }
}

export default MeasurementResult