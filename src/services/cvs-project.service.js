import httpClient from '../http-client';

const API_EXTENSION = 'cvs/project/';

class CVSProjectService {

    async get_all_projects() {
        const response = await httpClient.get(API_EXTENSION + 'get/all/');
        return response.data;
    }

    async get_projects(index = 0, segment_length = 10) {
        const response = await httpClient.get(API_EXTENSION + 'get/segment/', {
            params: {
                segment_length: segment_length,
                index: index,
            },
        });
        return response.data;
    }

    async get_project(project_id) {
        const response = await httpClient.get(API_EXTENSION + 'get/' + project_id);
        return response.data;
    }

    async create_project(project) {
        const response = await httpClient.post(API_EXTENSION + 'create/', {
            name: project.name,
            description: project.description,
        });
        return response.data;
    }

    async edit_project(project) {
        const response = await httpClient.put(API_EXTENSION + project.id + '/edit/', {
            name: project.name,
            description: project.description,
        });
        return response.data;
    }

    async delete_project(project_id) {
        const response = await httpClient.delete(API_EXTENSION + project_id + '/delete/');
        return response.data;
    }

}

export default new CVSProjectService();
