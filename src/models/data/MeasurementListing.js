class MeasurementListing {
    constructor (dbData) {
        this.id = dbData.id
        this.name = dbData.name
        this.description = dbData.description
        this.type = dbData.type
        this.dataCount = dbData.data_count
    }
}

export default MeasurementListing