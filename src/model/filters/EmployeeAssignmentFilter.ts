import {type User} from "../entities/User.ts";
import {UserRole} from "../enums/UserRole.ts";

export const taskEmployeeAssignmentFilter = (user: User) => {
    return user.role === UserRole.DEVOPS || user.role === UserRole.DEVELOPER;
}