import type {Priority} from "../enums/Priority.ts";
import type {WorkingState} from "../enums/WorkingState.ts";

export interface Task {
    id: string,
    name: string,
    description: string,
    estimatedFinishTimeHours: number,
    priority: Priority,
    workingState: WorkingState,
    createdAt: Date,
    completeDate?: Date | null,
    userId: string | null,
    workingStartDate: Date | null,
    finishedDate: Date | null,
}