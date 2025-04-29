import {minLength, required} from "../utils/ValidationUtilities.ts";
import {BaseValidator} from "./BaseValidator.ts";
import {type IBaseValidator} from "../interfaces/IBaseValidator.ts";
import type {ValidationRules} from "../Validation.ts";

export interface ProjectValidationFields {
    name: string;
    description: string;
}

export interface IProjectValidator extends IBaseValidator<ProjectValidationFields> {
}

class ProjectValidator extends BaseValidator<ProjectValidationFields> implements IProjectValidator {
    rules: ValidationRules<ProjectValidationFields> = {
        name: [
            (value) => required(value),
            (value) => minLength(value, 5)
        ],
        description: [
            (value) => required(value),
            (value) => minLength(value, 10),
        ]
    }

    constructor() {
        super();
    }
}

const projectValidator = new ProjectValidator();
export default projectValidator as IProjectValidator;
