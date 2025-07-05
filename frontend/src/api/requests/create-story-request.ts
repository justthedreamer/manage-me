import type {Priority} from "../../enums/Priority.ts";
import type {WorkingState} from "../../enums/WorkingState.ts";

export interface CreateStoryRequest {
    name: string,
    description: string,
    priority: Priority,
    workingState: WorkingState,
}