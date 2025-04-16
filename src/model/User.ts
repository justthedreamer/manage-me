import type {UUIDTypes} from "uuid";
import {UserRole} from "./enums/UserRole";

export abstract class User {
    id: UUIDTypes;
    name: string;
    surname: string;
    attachedProjectId: UUIDTypes | null;
    abstract readonly role: UserRole;

    constructor(
        id: UUIDTypes,
        name: string,
        surname: string,
        attachedProjectId: UUIDTypes | null
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.attachedProjectId = attachedProjectId;
    }
}

export class Admin extends User {
    readonly role = UserRole.ADMIN;

    constructor(
        id: string,
        name: string,
        surname: string,
        attachedProjectId: UUIDTypes | null = null
    ) {
        super(id, name, surname, attachedProjectId);
    }
}

export class Devops extends User {
    readonly role = UserRole.DEVOPS;

    constructor(
        id: string,
        name: string,
        surname: string,
        attachedProjectId: UUIDTypes | null = null
    ) {
        super(id, name, surname, attachedProjectId);
    }
}

export class Developer extends User {
    readonly role = UserRole.DEVELOPER;

    constructor(
        id: string,
        name: string,
        surname: string,
        attachedProjectId: UUIDTypes | null = null
    ) {
        super(id, name, surname, attachedProjectId);
    }
}
