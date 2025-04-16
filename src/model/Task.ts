import type {UUIDTypes} from "uuid";
import type {Developer, Devops} from "./User";
import type {Priority} from "./enums/Priority.ts";
import {WorkingState} from "./enums/WorkingState.ts";


export abstract class Task {
    id: UUIDTypes
    name: string;
    description: string;
    priority: Priority;
    projectStoryId: UUIDTypes;
    estimatedFinishTimeHours: number;
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
        this.estimatedFinishTimeHours = estimatedFinishTimeHours;
        this.creationDate = creationDate;
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
    assignedUser: Devops | Developer;
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
        assignedUser: Devops | Developer,
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
    assignedUser: Devops | Developer;
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
        assignedUser: Devops | Developer,
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
