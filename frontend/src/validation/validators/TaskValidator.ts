import type {ValidationRules} from "../Validation.ts";
import type {TaskValidationFields, ITaskValidator} from "../interfaces/ITaskValidator.ts";
import {BaseValidator} from "./BaseValidator.ts";
import {minLength, positiveNumber, required} from "../utils/ValidationUtilities.ts";

class TaskValidator extends BaseValidator<TaskValidationFields> implements ITaskValidator {
    rules: ValidationRules<TaskValidationFields> = {
        name: [
            (value) => required(value),
            (value) => minLength(value, 5),
        ],
        description: [
            (value) => required(value),
            (value) => minLength(value, 10),
        ],
        estimatedFinishTime: [
            (value) => positiveNumber(value),
        ]
    };

    constructor() {
        super();
    }
}

const taskValidator = new TaskValidator();
export default taskValidator as ITaskValidator;
