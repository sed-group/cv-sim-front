import httpClient from '../http-client';

const API_EXTENSION = 'cvs/project/';

class VCSValueDriversService {

    async get_all(project_id) {
        const response = await httpClient.get(API_EXTENSION + project_id + '/value-driver/get/all/');
        return response.data;
    }

    async get_one(project_id, value_driver_id) {
        const response = await httpClient.get(API_EXTENSION + project_id + '/value-driver/get/' + value_driver_id);
        return response.data;
    }

    async create_one(project_id, value_driver) {
        const response = await httpClient.post(
            API_EXTENSION + project_id + '/value-driver/create/', {
                name: value_driver.name,
            },
        );
        return response.data;
    }

    async edit_one(project_id, value_driver) {
        const response = await httpClient.put(
            API_EXTENSION + project_id + '/value-driver/' + value_driver.id + '/edit/', {
                name: value_driver.name,
            },
        );
        return response.data;
    }

    async delete_one(project_id, value_driver_id) {
        const response = await httpClient.delete(
            API_EXTENSION + project_id + '/value-driver/' + value_driver_id + '/delete/',
        );
        return response.data;
    }

}

export default new VCSValueDriversService();
