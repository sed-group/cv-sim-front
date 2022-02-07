import httpClient from '../http-client';

const API_EXTENSION = 'cvs/project/';

class VCSSubprocessesService {

    async get_all(project_id) {
        const response = await httpClient.get(API_EXTENSION + project_id + '/subprocess/get/all/');
        return response.data;
    }

    async get_one(project_id, subprocesses_id) {
        const response = await httpClient.get(API_EXTENSION + project_id + '/subprocess/get/' + subprocesses_id);
        return response.data;
    }

    async create_one(project_id, subprocess) {
        const response = await httpClient.post(
            API_EXTENSION + project_id + '/subprocess/create/', {
                name: subprocess.name,
                parent_process_id: subprocess.parent_process_id,
                order_index: subprocess.order_index,
            },
        );
        return response.data;
    }

    async edit_one(project_id, subprocesses) {
        const response = await httpClient.put(
            API_EXTENSION + project_id + '/subprocess/' + subprocesses.id + '/edit/', {
                name: subprocesses.name,
                parent_process_id: subprocesses.parent_process_id,
            },
        );
        return response.data;
    }

    async delete_one(project_id, subprocesses_id) {
        const response = await httpClient.delete(
            API_EXTENSION + project_id + '/subprocess/' + subprocesses_id + '/delete/',
        );
        return response.data;
    }

    async update_indices(project_id, subprocess_ids, order_indices) {
        const response = await httpClient.put(
            API_EXTENSION + project_id + '/subprocess/update-indices', {
                subprocess_ids: subprocess_ids,
                order_indices: order_indices,
            },
        );
        return response.data;
    }

}

export default new VCSSubprocessesService();
