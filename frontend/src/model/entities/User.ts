import type {UUIDTypes} from "uuid";
import {UserRole} from "../enums/UserRole.ts";

export class User {
    id: UUIDTypes;
    name: string;
    surname: string;
    attachedProjectId: UUIDTypes | null;
    readonly role: UserRole;

    constructor(
        id: UUIDTypes,
        name: string,
        surname: string,
        role: UserRole,
        attachedProjectId: UUIDTypes | null = null
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.attachedProjectId = attachedProjectId;
    }

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
}
