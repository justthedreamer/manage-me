import {newGuid} from "../helpers/GuidHelper.ts";
import { UserRole } from "../model/enums/UserRole.ts";
import type {User} from "../model/User.ts";
import {projectMock} from "./ProjectMocks.ts";


export const adminUserMock: User= {
    id: newGuid(),
    name: "John",
    surname: "Admin",
    role: UserRole.Admin,
    attachedProjectId: projectMock.id
}

export const devopsUserMock : User = {
    id: newGuid(),
    name: "John",
    surname: "Devops",
    role: UserRole.Devops,
    attachedProjectId: projectMock.id,
}

export const developerUserMock: User = {
    id: newGuid(),
    name: "John",
    surname: "Developer",
    role : UserRole.Developer,
    attachedProjectId: projectMock.id,
}

export const usersMock : User[] = [adminUserMock,devopsUserMock,developerUserMock]