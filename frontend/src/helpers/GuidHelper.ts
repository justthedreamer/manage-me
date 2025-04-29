import {v4 as uuidv4} from "uuid";
import type {UUIDTypes} from "uuid";

export function newGuid(): UUIDTypes {
    return uuidv4();
}