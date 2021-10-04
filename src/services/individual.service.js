import httpClient from '../http-client';

const API_EXTENSION = 'core/individuals/';

class IndividualService {
    async postArchetype (name, parametersObject) {
        const data = {
            name: name,
            parameters: parametersObject
        };

        const resp = await httpClient.post(API_EXTENSION + 'archetypes/', data);
        return resp.data;
    }

    async getArchetype (archetypeID) {
        const resp = await httpClient.get(API_EXTENSION + `archetypes/${archetypeID}`);
        return resp.data;
    }

    async getIndividual (individualID) {
        const resp = await httpClient.get(API_EXTENSION + individualID);
        return resp.data;
    }

    async postIndividual (name, archetypeID, parameters) {
        const data = {
            name: name,
            archetype_id: archetypeID,
            parameters: parameters
        }
        const resp = await httpClient.post(API_EXTENSION, data)
        return resp.data
    }

    async postParameter (parameterPost) {
        if (parameterPost.type === -1) {
            parameterPost.type = getParameterType(parameterPost.value)
        }

        const data = {
            name: parameterPost.name,
            value: convertParameter(parameterPost.value, parameterPost.type),
        }

        if (parameterPost.type === 1) {
            // Integers represented as floats are not recognized as floats by javascript. 
            // So, we need to force the typing to avoid storing incorrect types
            data.type = 1 
        }

        const resp = await httpClient.post(API_EXTENSION + parameterPost.individualID + '/parameters/', data);
        return resp.data;
    }

    async deleteParameter (individualID, parameterID) {
        const resp = await httpClient.delete(API_EXTENSION + individualID + '/parameters/' + parameterID)
        return resp.data
    }

    async getArchetypeIndividuals(archetypeID) {
        const resp = await httpClient.get(API_EXTENSION + 'archetypes/' + archetypeID + '/individuals/ ')
        return resp.data
    }

    async getArchetypeIndividualsCount(archetypeID) {
        const resp = await httpClient.get(API_EXTENSION + 'archetypes/' + archetypeID + '/individuals/count ')
        return resp.data
    }

    async putArchetypeName(individualID, individualName) {
        const config = {
            params: {
                individual_name: individualName
            }
        }
        const resp = await httpClient.put(API_EXTENSION + 'archetypes/' + individualID + '/name', null, config)
        return resp.data
    }

    async putIndividualName(individualID, individualName) {
        const config = {
            params: {
                individual_name: individualName
            }
        }
        const resp = await httpClient.put(API_EXTENSION + individualID + '/name', null, config)
        return resp.data
    }

    async deleteArchetypeIndividuals(archetypeID) {
        const resp = await httpClient.delete(API_EXTENSION + 'archetypes/' + archetypeID + '/individuals/')
        return resp.data
    }

    async deleteIndividual(individualID) {
        const resp = await httpClient.delete(API_EXTENSION + individualID)
        return resp.data
    }
}

function convertParameter (parameterValue, parameterType) {
    if (parameterType === 0) {
        return parseInt(parameterValue)

    } else if (parameterType === 1) {
        const val = parseFloat(parameterValue)
        return val

    } else if (parameterType === 2) {
        if (parameterValue.toUpperCase() === 'TRUE') {
            return true
        } else {
            return false
        }

    } else {
        return parameterValue
    }
}

function getParameterType(parameterValue) {
    if (isNaN(parameterValue)) {
        // Not numeric
        if (parameterValue.toUpperCase() === "TRUE" || parameterValue.toUpperCase() === "FALSE") {   
            // It's a boolean
            return 2
        } else {
            // It's a string
            return 3
        }
    } else if (parameterValue.includes('.')) {  
        // It's a float
        return 1
    } else {
        // It's an integer
        return 0
    }
}


export default new IndividualService();
