import {useUIMessageStore} from "../stores/features/ui-message-store.ts";
import {UIMessageType} from "../components/features/ui-messages/UIMessage.ts";
import {useLoaderStore} from "../stores/features/loader-store.ts";

import type {Task} from "../types/Task.ts";
import type {CreateTaskRequest} from "../api/requests/create-task-request.ts";
import type {UpdateTaskRequest} from "../api/requests/update-task-request.ts";
import type {UpdateTaskStateDoingRequest} from "../api/requests/update-task-state-doing-request.ts";
import taskClient from "../api/clients/TaskClient.ts";

export interface TaskService {
    getAllAsync(projectId: string, storyId: string): Promise<Task[]>;

    getByIdAsync(projectId: string, storyId: string, taskId: string): Promise<Task>;

    createAsync(projectId: string, storyId: string, dto: CreateTaskRequest): Promise<void>;

    deleteAsync(projectId: string, storyId: string, taskId: string): Promise<void>;

    updateTaskAsync(projectId: string, storyId: string, taskId: string, dto: UpdateTaskRequest): Promise<void>;

    setTaskDoingAsync(projectId: string, storyId: string, taskId: string, dto: UpdateTaskStateDoingRequest): Promise<void>;

    setTaskDoneAsync(projectId: string, storyId: string, taskId: string): Promise<void>;
}

async function getAllAsync(projectId: string, storyId: string): Promise<Task[]> {
    useLoaderStore().activate();
    const result = await taskClient.getAll(projectId, storyId);
    useLoaderStore().deactivate();

    if (result.isSuccess) {
        return result.requestResult!;
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to load tasks, check console for details."
        });
        throw new Error(result.message);
    }
}

async function getByIdAsync(projectId: string, storyId: string, taskId: string): Promise<Task> {
    useLoaderStore().activate();
    const result = await taskClient.getById(projectId, storyId, taskId);
    useLoaderStore().deactivate();

    if (result.isSuccess) {
        return result.requestResult!;
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to load task, check console for details."
        });
        throw new Error(result.message);
    }
}

async function createAsync(projectId: string, storyId: string, dto: CreateTaskRequest): Promise<void> {
    useLoaderStore().activate();
    const result = await taskClient.create(projectId, storyId, dto);
    useLoaderStore().deactivate();

    if (result.isSuccess) {
        useUIMessageStore().queue({
            type: UIMessageType.SUCCESS,
            message: "Task created successfully."
        });
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to create task, check console for details."
        });
        throw new Error(result.message);
    }
}

async function deleteAsync(projectId: string, storyId: string, taskId: string): Promise<void> {
    useLoaderStore().activate();
    const result = await taskClient.delete(projectId, storyId, taskId);
    useLoaderStore().deactivate();

    if (result.isSuccess) {
        useUIMessageStore().queue({
            type: UIMessageType.SUCCESS,
            message: "Task deleted successfully."
        });
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to delete task, check console for details."
        });
        throw new Error(result.message);
    }
}

async function updateTaskAsync(projectId: string, storyId: string, taskId: string, dto: UpdateTaskRequest): Promise<void> {
    useLoaderStore().activate();
    const result = await taskClient.updateTask(projectId, storyId, taskId, dto);
    useLoaderStore().deactivate();

    if (result.isSuccess) {
        useUIMessageStore().queue({
            type: UIMessageType.SUCCESS,
            message: "Task updated successfully."
        });
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to update task, check console for details."
        });
        throw new Error(result.message);
    }
}

async function setTaskDoingAsync(projectId: string, storyId: string, taskId: string, dto: UpdateTaskStateDoingRequest): Promise<void> {
    useLoaderStore().activate();
    const result = await taskClient.setTaskDoing(projectId, storyId, taskId, dto);
    useLoaderStore().deactivate();

    if (result.isSuccess) {
        useUIMessageStore().queue({
            type: UIMessageType.SUCCESS,
            message: "Task state changed to DOING."
        });
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to change task state to DOING."
        });
        throw new Error(result.message);
    }
}

async function setTaskDoneAsync(projectId: string, storyId: string, taskId: string): Promise<void> {
    useLoaderStore().activate();
    const result = await taskClient.setTaskDone(projectId, storyId, taskId);
    useLoaderStore().deactivate();

    if (result.isSuccess) {
        useUIMessageStore().queue({
            type: UIMessageType.SUCCESS,
            message: "Task state changed to DONE."
        });
    } else {
        useUIMessageStore().queue({
            type: UIMessageType.ERROR,
            message: "Failed to change task state to DONE."
        });
        throw new Error(result.message);
    }
}

const taskService: TaskService = {
    getAllAsync,
    getByIdAsync,
    createAsync,
    deleteAsync,
    updateTaskAsync,
    setTaskDoingAsync,
    setTaskDoneAsync
};

export default taskService;
