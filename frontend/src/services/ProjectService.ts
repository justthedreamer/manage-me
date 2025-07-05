import {useLoaderStore} from "../stores/features/loader-store.ts";
import type {Project} from "../types/Project.ts";
import projectClient from "../api/clients/ProjectClient.ts";
import {useUIMessageStore} from "../stores/features/ui-message-store.ts";
import {UIMessageType} from "../components/features/ui-messages/UIMessage.ts";

export interface ProjectService {
    getByIdAsync(projectId: string): Promise<Project>;
}

async function getByIdAsync(projectId: string): Promise<Project> {
    useLoaderStore().activate()
    const result = await projectClient.getById(projectId)
    useLoaderStore().deactivate()
    if (result.isSuccess) {
        return result.requestResult!
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to fetch project, check web console to see details."
        })
        throw new Error(result.message)
    }
}

const projectService: ProjectService = {
    getByIdAsync,
}

export default projectService;