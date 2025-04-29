import type {UUIDTypes} from "uuid";
import type {Priority} from "../enums/Priority.ts";
import {WorkingState} from "../enums/WorkingState.ts";
import type {User} from "./User.ts";


export abstract class Task {
    id: UUIDTypes
    name: string;
    description: string;
    priority: Priority;
    projectStoryId: UUIDTypes;
    estimatedFinishTime: number;
    creationDate: Date;
    abstract readonly state: WorkingState;

    protected constructor(
        id: UUIDTypes,
        name: string,
        description: string,
        priority: Priority,
        projectStoryId: UUIDTypes,
        estimatedFinishTimeHours: number,
        creationDate: Date
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.projectStoryId = projectStoryId;
        this.estimatedFinishTime = estimatedFinishTimeHours;
        this.creationDate = creationDate;
    }

    static fromJSON(obj: any): Task {
        switch (obj.state) {
            case WorkingState.TODO:
                return new TodoTask(
                    obj.id,
                    obj.name,
                    obj.description,
                    obj.priority,
                    obj.projectStoryId,
                    obj.estimatedFinishTime,
                    new Date(obj.creationDate)
                );

            case WorkingState.DOING:
                return new DoingTask(
                    obj.id,
                    obj.name,
                    obj.description,
                    obj.priority,
                    obj.projectStoryId,
                    obj.estimatedFinishTime,
                    new Date(obj.creationDate),
                    new Date(obj.workStartDate),
                    obj.assignedUser
                );

            case WorkingState.DONE:
                return new DoneTask(
                    obj.id,
                    obj.name,
                    obj.description,
                    obj.priority,
                    obj.projectStoryId,
                    obj.estimatedFinishTime,
                    new Date(obj.creationDate),
                    new Date(obj.workStartDate),
                    obj.assignedUser,
                    new Date(obj.finishDate)
                );

            default:
                throw new Error(`Unknown task state: ${obj.state}`);
        }
    }

}

export class TodoTask extends Task {
    readonly state = WorkingState.TODO;

    constructor(
        id: UUIDTypes,
        name: string,
        description: string,
        priority: Priority,
        projectStoryId: UUIDTypes,
        estimatedFinishTimeHours: number,
        creationDate: Date,
    ) {
        super(
            id,
            name,
            description,
            priority,
            projectStoryId,
            estimatedFinishTimeHours,
            creationDate
        );
    }
}

export class DoingTask extends Task {
    workStartDate: Date;
    assignedUser: User
    readonly state = WorkingState.DOING;

    constructor(
        id: UUIDTypes,
        name: string,
        description: string,
        priority: Priority,
        projectStoryId: UUIDTypes,
        estimatedFinishTimeHours: number,
        creationDate: Date,
        workStartDate: Date,
        assignedUser: User
    ) {
        super(
            id,
            name,
            description,
            priority,
            projectStoryId,
            estimatedFinishTimeHours,
            creationDate
        );
        this.workStartDate = workStartDate;
        this.assignedUser = assignedUser;
    }
}

export class DoneTask extends Task {
    workStartDate: Date;
    assignedUser: User;
    finishDate: Date;
    readonly state = WorkingState.DONE;

    constructor(
        id: UUIDTypes,
        name: string,
        description: string,
        priority: Priority,
        projectStoryId: UUIDTypes,
        estimatedFinishTimeHours: number,
        creationDate: Date,
        workStartDate: Date,
        assignedUser: User,
        finishDate: Date
    ) {
        super(
            id,
            name,
            description,
            priority,
            projectStoryId,
            estimatedFinishTimeHours,
            creationDate
        );

        this.workStartDate = workStartDate;
        this.assignedUser = assignedUser;
        this.finishDate = finishDate;
    }
}