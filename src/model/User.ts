import type {UUIDTypes} from "uuid";

/**
 * Represents application user.
 */
export type User = {
    id: UUIDTypes,
    name: string,
    surname: string,
    attachedProjectId: UUIDTypes | null
}