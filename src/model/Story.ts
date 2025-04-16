import type {WorkingState} from "./enums/WorkingState.ts";
import type {Priority} from "./enums/Priority.ts";
import type {UUIDTypes} from "uuid";
import type {Task} from "./Task.ts";

export type Story = {
    id: UUIDTypes;
    projectId: UUIDTypes;
    userId: UUIDTypes;
    name: string;
    description: string;
    priority: Priority;
    createdAt: Date;
    state: WorkingState;
    tasks: Task[];
};
