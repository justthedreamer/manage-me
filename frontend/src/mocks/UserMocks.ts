import {User} from "../model/entities/User.ts";
import {newGuid} from "../helpers/GuidHelper.ts";
import {UserRole} from "../model/enums/UserRole.ts";
import {projectMock} from "./ProjectMocks.ts";

export const adminUserMock = new User(newGuid(), 'John', 'Doe', UserRole.ADMIN, projectMock.id);
export const devopsUserMock = new User(newGuid(), 'Jane', 'Smith', UserRole.DEVOPS, projectMock.id);
export const developerUserMock = new User(newGuid(), 'Bob', 'Brown', UserRole.DEVELOPER, projectMock.id);

export const usersMocks: User[] = [
    adminUserMock,
    devopsUserMock,
    developerUserMock,
];
