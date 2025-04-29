import type {Story} from "../model/entities/Story.ts";
import {InvalidOperationError} from "../errors/InvalidOperationError.ts";
import type {Project} from "../model/entities/Project.ts";
import type {Task} from "../model/entities/Task.ts";
import {InvalidArgumentError} from "../errors/InvalidArgumentError.ts";
import {User} from "../model/entities/User.ts";
import {UserRole} from "../model/enums/UserRole.ts";

export function assertUserDefined(user: User | null | undefined): asserts user is User {
    if (!user) {
        throw new InvalidOperationError("user is undefined.");
    }
}

export function assertProjectDefined(project: Project | null): asserts project is Project {
    if (!project) {
        throw new InvalidOperationError("project is undefined.");
    }
}

export function assertStoryDefined(story: Story | null): asserts story is Story {
    if (!story) {
        throw new InvalidOperationError("story is undefined.");
    }
}

export function assertTaskDefined(task: Task | null): asserts task is Task {
    if (!task) {
        throw new InvalidOperationError("task is undefined.");
    }
}

export function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

export function assertUserDevopsOrDeveloper(user: User) {
    if (user.role !== UserRole.DEVOPS && user.role !== UserRole.DEVELOPER) {
        throw new InvalidArgumentError("User is not devops or developer.");
    }
}