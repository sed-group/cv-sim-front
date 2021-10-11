import httpClient from '../http-client';

const API_EXTENSION_SINGULAR = 'cvs/project/';
const API_EXTENSION_PLURAL = 'cvs/projects/';

class CVSProjectService {

    async get_projects(index = 0, segmentLength = 10) {
        const response = await httpClient.get(API_EXTENSION_PLURAL + 'all', {
            params: {
                segment_length: segmentLength,
                index: index,
            },
        });
        return response.data;
    }

    async get_project(project_id) {
        const response = await httpClient.get(API_EXTENSION_SINGULAR + 'get/' + project_id);
        return response.data;
    }

    async create_project(project) {
        const response = await httpClient.post(API_EXTENSION_SINGULAR + 'create', {
            name: project.name,
            description: project.description,
        });
        return response.data;
    }

    async edit_project(project) {
        const response = await httpClient.put(API_EXTENSION_SINGULAR + project.id + '/edit', {
            name: project.name,
            description: project.description,
        });
        return response.data;
    }

    async delete_project(project_id) {
        const response = await httpClient.delete(API_EXTENSION_SINGULAR + project_id + '/delete/');
        return response.data;
    }

}

export default new CVSProjectService();
