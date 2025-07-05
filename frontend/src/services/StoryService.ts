import {useUIMessageStore} from "../stores/features/ui-message-store.ts";
import {UIMessageType} from "../components/features/ui-messages/UIMessage.ts";
import type {Story} from "../types/Story.ts";
import storyClient from "../api/clients/StoryClient.ts";
import {useLoaderStore} from "../stores/features/loader-store.ts";
import type {CreateStoryRequest} from "../api/requests/create-story-request.ts";
import type {UpdateStoryRequest} from "../api/requests/update-story-request.ts";

export interface StoryService {
    getByIdAsync(projectId: string, storyId: string): Promise<Story>;

    getByProjectIdAsync(projectId: string): Promise<Story[]>;

    createAsync(projectId: string, dto: CreateStoryRequest): Promise<void>;

    updateAsync(projectId: string, storyId: string, dto: UpdateStoryRequest): Promise<void>;

    deleteAsync(projectId: string, storyId: string): Promise<void>;
}

async function getByIdAsync(projectId: string, storyId: string): Promise<Story> {
    useLoaderStore().activate()
    const result = await storyClient.getById(projectId, storyId)
    useLoaderStore().deactivate()
    if (result.isSuccess) {
        return result.requestResult!
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to fetch story, check web console to see details."
        })
        throw new Error(result.message)
    }
}

async function getByProjectIdAsync(projectId: string): Promise<Story[]> {
    useLoaderStore().activate()
    const result = await storyClient.getByProjectId(projectId)
    useLoaderStore().deactivate()
    if (result.isSuccess) {
        return result.requestResult!
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to fetch story, check web console to see details."
        })
        throw new Error(result.message)
    }
}

async function createAsync(projectId: string, dto: CreateStoryRequest): Promise<void> {
    useLoaderStore().activate()
    const result = await storyClient.create(projectId, dto)
    if (result.isSuccess) {
        useUIMessageStore().queue({
            type: UIMessageType.SUCCESS,
            message: `Story created successfully.`,
        })
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to create story, check web console to see details."
        })
        throw new Error(result.message)
    }
}

async function updateAsync(projectId: string, storyId: string, dto: UpdateStoryRequest): Promise<void> {
    useLoaderStore().activate()
    const result = await storyClient.update(projectId, storyId, dto)
    useLoaderStore().deactivate()
    if (result.isSuccess) {
        useUIMessageStore().queue({
            type: UIMessageType.SUCCESS,
            message: `Story updated successfully.`,
        })
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to update story, check web console to see details."
        })
        throw new Error(result.message)
    }
}

async function deleteAsync(projectId: string, storyId: string): Promise<void> {
    useLoaderStore().activate()
    const result = await storyClient.delete(projectId, storyId)
    useLoaderStore().deactivate()
    if (result.isSuccess) {
        useUIMessageStore().queue({
            type: UIMessageType.SUCCESS,
            message: `Story deleted successfully.`,
        })
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to delete story, check web console to see details."
        });
        throw new Error(result.message)
    }
}

const storyService: StoryService = {
    getByIdAsync,
    getByProjectIdAsync: getByProjectIdAsync,
    createAsync,
    updateAsync,
    deleteAsync,
}

export default storyService;