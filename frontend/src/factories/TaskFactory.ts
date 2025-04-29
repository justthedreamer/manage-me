import {TodoTask, DoingTask} from "../model/entities/Task.ts";
import {newGuid} from "../helpers/GuidHelper.ts";
import type {Priority} from "../model/enums/Priority.ts";
import type {UUIDTypes} from "uuid";
import type {User} from "../model/entities/User.ts";

export class TaskFactory {
    static CreateTodoTask(name: string, description: string, priority: Priority, projectStoryId: UUIDTypes, estimatedFinishTime: number) {
        return new TodoTask(newGuid(), name, description, priority, projectStoryId, estimatedFinishTime, new Date())
    }

    static CreateDoingTask(name: string, description: string, priority: Priority, projectStoryId: UUIDTypes, estimatedFinishTime: number, assignedUser: User) {
        const now = new Date()
        return new DoingTask(newGuid(), name, description, priority, projectStoryId, estimatedFinishTime, now, now, assignedUser)
    }
}
