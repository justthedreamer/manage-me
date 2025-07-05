import type {UserRole} from "../enums/UserRole.ts";

export interface User {
    id: string,
    login: string,
    name: string,
    role: UserRole,
}