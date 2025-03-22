import type {ProjectStoryState} from "./enums/ProjectStoryState.ts";
import type {ProjectStoryPriority} from "./enums/ProjectStoryPriority.ts";
import type {UUIDTypes} from "uuid";

export type ProjectStory = {
    id: UUIDTypes,
    projectId: UUIDTypes,
    userId: UUIDTypes,
    name: string,
    description: string,
    priority: ProjectStoryPriority,
    createdAt: Date,
    state: ProjectStoryState,
}