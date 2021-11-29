import httpClient from '../http-client';

const API_EXTENSION = 'cvs/project/';

class CVSVCSService {

    async get_all_vcss(project_id) {
        const response = await httpClient.get(API_EXTENSION + project_id + '/vcs/get/all/');
        return response.data;
    }

    async get_vcss(project_id, index = 0, segment_length = 10) {
        const response = await httpClient.get(API_EXTENSION + project_id + '/vcs/get/segment/', {
            params: {
                segment_length: segment_length,
                index: index,
            },
        });
        return response.data;
    }

    async get_vcs(project_id, vcs_id) {
        const response = await httpClient.get(API_EXTENSION + project_id + '/vcs/get/' + vcs_id);
        return response.data;
    }

    async create_vcs(project_id, vcs) {
        const response = await httpClient.post(API_EXTENSION + project_id + '/vcs/create/', {
            name: vcs.name,
            description: vcs.description,
            year_from: vcs.year_from,
            year_to: vcs.year_to,
        });
        return response.data;
    }

    async edit_vcs(project_id, vcs) {
        const response = await httpClient.put(API_EXTENSION + project_id + '/vcs/' + vcs.id + '/edit/', {
            name: vcs.name,
            description: vcs.description,
            year_from: vcs.year_from,
            year_to: vcs.year_to,
        });
        return response.data;
    }

    async delete_vcs(project_id, vcs_id) {
        const response = await httpClient.delete(API_EXTENSION + project_id + '/vcs/' + vcs_id + '/delete/');
        return response.data;
    }

    async get_vcs_table(project_id, vcs_id) {
        const response = await httpClient.get(API_EXTENSION + project_id + '/vcs/' + vcs_id + '/get/table/');
        return response.data;
    }

}

export default new CVSVCSService();
