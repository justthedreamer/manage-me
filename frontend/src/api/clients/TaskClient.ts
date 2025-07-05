import http from "../Axios.ts";
import type {Task} from "../../types/Task.ts";
import {
    type ClientRequestResult,
    genericInternalServerErrorClientRequestResult,
    genericUnauthorizedClientRequestResult
} from "../ClientRequestResult.ts";
import type {UpdateTaskRequest} from "../requests/update-task-request.ts";
import type {UpdateTaskStateDoingRequest} from "../requests/update-task-state-doing-request.ts";
import type {CreateTaskRequest} from "../requests/create-task-request.ts";

export interface TaskClient {
    getAll(projectId: string, storyId: string): Promise<ClientRequestResult<Task[]>>;

    getById(projectId: string, storyId: string, taskId: string): Promise<ClientRequestResult<Task>>;

    create(projectId: string, storyId: string, dto: CreateTaskRequest): Promise<ClientRequestResult<string>>;

    delete(projectId: string, storyId: string, taskId: string): Promise<ClientRequestResult<null>>;

    updateTask(projectId: string, storyId: string, taskId: string, dto: UpdateTaskRequest): Promise<ClientRequestResult<null>>;

    setTaskDoing(projectId: string, storyId: string, taskId: string, dto: UpdateTaskStateDoingRequest): Promise<ClientRequestResult<null>>

    setTaskDone(projectId: string, storyId: string, taskId: string): Promise<ClientRequestResult<null>>
}

const taskClient: TaskClient = {
    async getAll(projectId: string, storyId: string): Promise<ClientRequestResult<Task[]>> {
        const response = await http.get<Task[]>(`/projects/${projectId}/stories/${storyId}/tasks`);
        switch (response.status) {
            case 200: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: `Tasks successfully loaded`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult()
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText,
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult()
            }
        }
    },
    async getById(projectId: string, storyId: string, taskId: string): Promise<ClientRequestResult<Task>> {
        const response = await http.get<Task>(`/projects/${projectId}/stories/${storyId}/tasks/${taskId}`);
        switch (response.status) {
            case 200: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: `Tasks successfully loaded`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult()
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText,
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult()
            }
        }
    },
    async create(projectId: string, storyId: string, dto: CreateTaskRequest): Promise<ClientRequestResult<string>> {
        const response = await http.post(`/projects/${projectId}/stories/${storyId}/tasks`, dto);
        switch (response.status) {
            case 201: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: `Tasks created successfully`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult()
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText,
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult()
            }
        }
    },
    async delete(projectId: string, storyId: string, taskId: string): Promise<ClientRequestResult<null>> {
        const response = await http.delete(`/projects/${projectId}/stories/${storyId}/tasks/${taskId}`);
        switch (response.status) {
            case 204: {
                return {
                    requestResult: null,
                    isSuccess: true,
                    message: `Tasks deleted successfully`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult()
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText,
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult()
            }
        }
    },
    async updateTask(projectId: string, storyId: string, taskId: string, dto: UpdateTaskRequest): Promise<ClientRequestResult<null>> {
        const response = await http.patch(`/projects/${projectId}/stories/${storyId}/tasks/${taskId}`, dto);
        switch (response.status) {
            case 204: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: `Tasks updated successfully`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult()
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText,
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult()
            }
        }
    },
    async setTaskDoing(projectId: string, storyId: string, taskId: string, dto: UpdateTaskStateDoingRequest): Promise<ClientRequestResult<null>> {
        const response = await http
            .patch(`/projects/${projectId}/stories/${storyId}/tasks/${taskId}/state/doing`, dto);
        switch (response.status) {
            case 204: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: `Tasks updated successfully`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult()
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText,
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult()
            }
        }
    },
    async setTaskDone(projectId: string, storyId: string, taskId: string): Promise<ClientRequestResult<null>> {
        const response = await http
            .patch(`/projects/${projectId}/stories/${storyId}/tasks/${taskId}/state/done`);
        switch (response.status) {
            case 204: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: `Tasks updated successfully`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult()
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText,
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult()
            }
        }
    }
}

export default taskClient;