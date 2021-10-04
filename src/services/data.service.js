import httpClient from '../http-client'

const API_EXTENSION = 'core/data/' 

class DataService {

    async getMeasurementData (setID, measurementID, dtype=null, dateFrom=null, dateTo=null, dateClass=null) {
        const config = {
            params: {
                dtype: dtype,
                date_from: dateFrom,
                date_to: dateTo,
                date_class: dateClass
            }
        }
        console.log("Fetch measurement with id = "+measurementID+" in set id = "+setID)
        const resp = await httpClient.get(`${API_EXTENSION}sets/${setID}/measurements/${measurementID}/results/`, config)
        return resp.data
    }

    async getMeasurementSets (subprojectID) {
        const config = {
            params: {
                subproject_id: subprojectID
            }
        }
        const resp = await httpClient.get(API_EXTENSION + 'sets/', config)
        return resp.data
    }

    async getMeasurementSet (setID) {
        const resp = await httpClient.get(API_EXTENSION + 'sets/' + setID)
        return resp.data
    }

    async createMeasurementSet (name, type, description, subprojectID) {
        console.log(subprojectID)
        const data = {
            name: name,
            type: type,
            description: description
        }

        const config = {
            params: {
                subproject_id: subprojectID
            }
        }

        const resp = await httpClient.post(API_EXTENSION + 'sets/', data, config)
        return resp.data
    }

    async deleteMeasurementSet (measurementSetID) {
        console.log("Delete "+measurementSetID)
        const resp = await httpClient.delete(API_EXTENSION + 'sets/'+measurementSetID)
        return resp.data
    }

    async deleteMeasurement (measurementSetID, measurementID) {
        const resp = await httpClient.delete(API_EXTENSION + 'sets/' + measurementSetID + '/measurements/' + measurementID)
        return resp.data
    }

    async createMeasurement (setID, name, type, description) {
        const data = {
            name: name,
            type: type,
            description: description,
        }
        const resp = await httpClient.post(API_EXTENSION + 'sets/' + setID +'/measurements/', data)
        return resp.data
    }
}

export default new DataService();
