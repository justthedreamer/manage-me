import http from "../Axios.ts";
import {
    type ClientRequestResult,
    genericInternalServerErrorClientRequestResult,
    genericUnauthorizedClientRequestResult
} from "../ClientRequestResult.ts";
import type {CreateStoryRequest} from "../requests/create-story-request.ts";
import type {UpdateStoryRequest} from "../requests/update-story-request.ts";
import type {Story} from "../../types/Story.ts";

interface StoryClient {
    getByProjectId(projectId: string): Promise<ClientRequestResult<Story[]>>;

    getById(projectId: string, storyId: string): Promise<ClientRequestResult<Story>>;

    create(projectId: string, dto: CreateStoryRequest): Promise<ClientRequestResult<null>>;

    update(projectId: string, storyId: string, dto: UpdateStoryRequest): Promise<ClientRequestResult<null>>;

    delete(projectId: string, storyId: string): Promise<ClientRequestResult<null>>;
}

const storyClient: StoryClient = {
    async getByProjectId(projectId: string): Promise<ClientRequestResult<Story[]>> {
        const response = await http.get<Story[]>(`/projects/${projectId}/stories`);
        switch (response.status) {
            case 200: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: `Successfully retrieved stories for project: ${projectId}`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText,
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },
    async getById(projectId: string, storyId: string): Promise<ClientRequestResult<Story>> {
        const response = await http.get<Story>(`/projects/${projectId}/stories/${storyId}`);
        switch (response.status) {
            case 200: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: `Successfully retrieved stories for project: ${projectId}`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },
    async create(projectId: string, dto: CreateStoryRequest): Promise<ClientRequestResult<null>> {
        const response = await http.post(`/projects/${projectId}/stories`, dto);
        switch (response.status) {
            case 201: {
                return {
                    requestResult: null,
                    isSuccess: true,
                    message: `Story created successfully`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },
    async update(projectId: string, storyId: string, dto: UpdateStoryRequest): Promise<ClientRequestResult<null>> {
        const response = await http.patch(`/projects/${projectId}/stories/${storyId}`, dto);
        switch (response.status) {
            case 204: {
                return {
                    requestResult: null,
                    isSuccess: true,
                    message: `Story updated successfully`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },
    async delete(projectId: string, storyId: string): Promise<ClientRequestResult<null>> {
        const response = await http.delete(`/projects/${projectId}/stories/${storyId}`);
        switch (response.status) {
            case 204: {
                return {
                    requestResult: null,
                    isSuccess: true,
                    message: `Story deleted successfully`,
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    }
}

export default storyClient;