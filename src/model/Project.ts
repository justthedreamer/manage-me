import type {ProjectStory} from "./ProjectStory.ts";
import type {UUIDTypes} from "uuid";

/**
 * Represents project.
 */
export type Project = {
    id: UUIDTypes,
    name: string,
    description: string,
    stories: ProjectStory[]
}

