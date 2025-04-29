import type {IBaseValidator} from "./IBaseValidator.ts";

export interface StoryValidationFields {
    name: string;
    description: string;
}

export interface IStoryValidator extends IBaseValidator<StoryValidationFields> {
}
