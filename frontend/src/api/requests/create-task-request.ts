import type {Priority} from "../../enums/Priority.ts";

export interface CreateTaskRequest {
    name: string,
    description: string,
    estimatedFinishTimeHours: number,
    priority: Priority,
    assignedUserId: string | null
}