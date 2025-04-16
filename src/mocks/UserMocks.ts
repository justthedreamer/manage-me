import {newGuid} from "../helpers/GuidHelper.ts";
import {UserRole} from "../model/enums/UserRole.ts";
import {Admin, Developer, Devops, User} from "../model/User.ts";
import {projectMock} from "./ProjectMocks.ts";

export const devopsUserMock: Devops = {
    id: newGuid(),
    name: "John",
    surname: "Devops",
    role: UserRole.DEVOPS,
    attachedProjectId: projectMock.id,
};

export const developerUserMock: Developer = {
    id: newGuid(),
    name: "John",
    surname: "Developer",
    role: UserRole.DEVELOPER,
    attachedProjectId: projectMock.id,
};

export const adminUserMock: Admin = {
    id: newGuid(),
    name: "John",
    surname: "Admin",
    role: UserRole.ADMIN,
    attachedProjectId: projectMock.id,
};

export const usersMocks: User[] = [
    adminUserMock,
    devopsUserMock,
    developerUserMock,
];
