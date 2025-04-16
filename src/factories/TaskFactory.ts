import { TodoTask, DoingTask, DoneTask } from "../model/Task";
import { WorkingState } from "../model/enums/WorkingState";
import type { Task } from "../model/Task";
import type { Devops, Developer } from "../model/User";

export class TaskFactory {
    static fromJSON(obj: any): Task {
        switch (obj.state) {
            case WorkingState.TODO:
                return new TodoTask(
                    obj.id,
                    obj.name,
                    obj.description,
                    obj.priority,
                    obj.projectStoryId,
                    obj.estimatedFinishTimeHours,
                    new Date(obj.creationDate)
                );

            case WorkingState.DOING:
                return new DoingTask(
                    obj.id,
                    obj.name,
                    obj.description,
                    obj.priority,
                    obj.projectStoryId,
                    obj.estimatedFinishTimeHours,
                    new Date(obj.creationDate),
                    new Date(obj.workStartDate),
                    obj.assignedUser as Devops | Developer
                );

            case WorkingState.DONE:
                return new DoneTask(
                    obj.id,
                    obj.name,
                    obj.description,
                    obj.priority,
                    obj.projectStoryId,
                    obj.estimatedFinishTimeHours,
                    new Date(obj.creationDate),
                    new Date(obj.workStartDate),
                    obj.assignedUser as Devops | Developer,
                    new Date(obj.finishDate)
                );

            default:
                throw new Error(`Unknown task state: ${obj.state}`);
        }
    }
}
