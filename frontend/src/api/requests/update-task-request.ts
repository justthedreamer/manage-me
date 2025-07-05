import type {Priority} from "../../enums/Priority.ts";

export interface UpdateTaskRequest {
    name: string;
    description: string;
    priority: Priority;
    estimatedFinishTimeHours: number;
}