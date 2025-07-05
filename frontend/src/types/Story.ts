import type {UUIDTypes} from "uuid";
import type {Priority} from "../enums/Priority.ts";
import type {WorkingState} from "../enums/WorkingState.ts";

export interface Story {
    id: string;
    projectId: string;
    userId: string;
    name: string;
    description: string;
    priority: Priority;
    createdAt: Date;
    state: WorkingState;
}
