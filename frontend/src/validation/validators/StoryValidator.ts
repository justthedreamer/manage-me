import {required, minLength} from '../utils/ValidationUtilities.ts';
import type {ValidationRules} from '../Validation.ts';
import {BaseValidator} from "./BaseValidator.ts";
import type {IStoryValidator, StoryValidationFields} from "../interfaces/IStoryValidator.ts";

class StoryValidator
    extends BaseValidator<StoryValidationFields>
    implements IStoryValidator {
    rules: ValidationRules<StoryValidationFields> = {
        name: [
            (value) => required(value),
            (value) => minLength(value, 5),
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

const storyValidator = new StoryValidator();
export default storyValidator as IStoryValidator;
