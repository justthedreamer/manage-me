import type {Priority} from "../../enums/Priority.ts";
import type {WorkingState} from "../../enums/WorkingState.ts";

export interface UpdateStoryRequest {
    name: string,
    description: string,
    priority: Priority,
    state: WorkingState
}