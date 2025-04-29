import type {IBaseValidator} from "./IBaseValidator.ts";

export interface TaskValidationFields {
    name: string;
    description: string;
    estimatedFinishTime: number;
}

export interface ITaskValidator extends IBaseValidator<TaskValidationFields> {
}
