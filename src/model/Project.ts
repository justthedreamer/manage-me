import type {Story} from "./Story.ts";
import type {UUIDTypes} from "uuid";

/**
 * Represents project.
 */
export type Project = {
    id: UUIDTypes;
    name: string;
    description: string;
    stories: Story[];
};
