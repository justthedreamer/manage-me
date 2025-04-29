import type {UUIDTypes} from "uuid";
import type {Priority} from "../enums/Priority.ts";
import type {WorkingState} from "../enums/WorkingState.ts";
import {Task} from "./Task.ts";

export class Story {
    id: UUIDTypes;
    projectId: UUIDTypes;
    userId: UUIDTypes;
    name: string;
    description: string;
    priority: Priority;
    createdAt: Date;
    state: WorkingState;
    tasks: Array<Task>;

    constructor(
        id: UUIDTypes,
        name: string,
        description: string,
        priority: Priority,
        state: WorkingState,
        userId: UUIDTypes,
        projectId: UUIDTypes,
        tasks: Task[]
    ) {
        this.id = id;
        this.createdAt = new Date();
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.state = state;
        this.userId = userId;
        this.projectId = projectId;
        this.tasks = tasks;
    }

    static fromJSON(obj: any): Story {
        const tasks = Array.isArray(obj.tasks)
            ? obj.tasks.map(Task.fromJSON)
            : [];

        return new Story(
            obj.id as UUIDTypes,
            obj.name,
            obj.description,
            obj.priority as Priority,
            obj.state as WorkingState,
            obj.userId as UUIDTypes,
            obj.projectId as UUIDTypes,
            tasks);
    }

    updateDescription(newDescription: string) {
        this.description = newDescription;
    }

    updateState(newState: WorkingState) {
        this.state = newState;
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }
}
