import {newGuid} from "../helpers/GuidHelper.ts";
import type {User} from "../model/User.ts";
import {projectMock} from "./ProjectMocks.ts";

export const registeredUserMock: User = {
    id: newGuid(),
    name: "John",
    surname: "Doe",
    attachedProjectId: projectMock.id,
}