import http from "../Axios.ts";
import type {Project} from "../../types/Project.ts";
import {
    type ClientRequestResult,
    genericInternalServerErrorClientRequestResult,
    genericUnauthorizedClientRequestResult
} from "../ClientRequestResult.ts";
import type {UpdateProjectRequest} from "../requests/update-project-request.ts";
import type {CreateProjectRequest} from "../requests/create-project-request.ts";

export interface ProjectClient {
    getAll(): Promise<ClientRequestResult<Project[]>>;

    getById(id: string): Promise<ClientRequestResult<Project>>

    create(dto: CreateProjectRequest): Promise<ClientRequestResult<null>>;

    update(id: string, request: UpdateProjectRequest): Promise<ClientRequestResult<null>>;

    delete(id: string): Promise<ClientRequestResult<null>>;
}

const projectClient: ProjectClient = {
    async getAll(): Promise<ClientRequestResult<Project[]>> {
        const response = await http.get<Project[]>("/projects");
        switch (response.status) {
            case 200: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: "Projects successfully loaded"
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },
    async getById(id: string): Promise<ClientRequestResult<Project>> {
        const response = await http.get<Project>(`/projects/${id}`);
        switch (response.status) {
            case 200: {
                return {
                    requestResult: response.data,
                    isSuccess: true,
                    message: "Project successfully loaded"
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },
    async create(dto: CreateProjectRequest): Promise<ClientRequestResult<null>> {
        const response = await http.post("/projects", dto);
        switch (response.status) {
            case 201: {
                return {
                    requestResult: null,
                    isSuccess: true,
                    message: "Project successfully created"
                }
            }
            case 400: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: response.statusText
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },
    async updateAsync(id: string, request: UpdateProjectRequest): Promise<ClientRequestResult<null>> {
        const response = await http.patch(`/projects/${id}`, request);
        switch (response.status) {
            case 204: {
                return {
                    requestResult: null,
                    isSuccess: true,
                    message: "Project successfully updated"
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: "Project not found"
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    },
    async delete(id: string): Promise<ClientRequestResult<null>> {
        const response = await http.delete(`/projects/${id}`);
        switch (response.status) {
            case 204: {
                return {
                    requestResult: null,
                    isSuccess: true,
                    message: "Project successfully deleted"
                }
            }
            case 401: {
                return genericUnauthorizedClientRequestResult();
            }
            case 404: {
                return {
                    requestResult: null,
                    isSuccess: false,
                    message: "Project not found"
                }
            }
            default: {
                return genericInternalServerErrorClientRequestResult();
            }
        }
    }
}

export default projectClient;