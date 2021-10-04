import httpClient from '../http-client';

const API_EXTENSION = 'cvs/projects/';

class CVSProjectService {

    async get_projects(index = 0, segmentLength = 10) {
        const resp = await httpClient.get(API_EXTENSION + 'all', {
            params: {
                segment_length: segmentLength,
                index: index,
            },
        });
        return resp.data;
    }

    async get_project(project_id) {
        const resp = await httpClient.get(API_EXTENSION + project_id);
        return resp.data;
    }

    async create_project(project) {
        const resp = await httpClient.post(API_EXTENSION + 'create', {
            name: project.name,
            description: project.description,
        });
        return resp.data;
    }

    async delete_project(project_id) {
        const resp = await httpClient.delete(API_EXTENSION + project_id + '/delete/');
        return resp.data;
    }

    async putProjectArchetype(projectID, archetypeID) {
        const resp = await httpClient.put(API_EXTENSION + projectID + '/archetype', null, {
            params: {
                individual_archetype_id: archetypeID,
            },
        });
        return resp.data;
    }

}

export default new CVSProjectService();
