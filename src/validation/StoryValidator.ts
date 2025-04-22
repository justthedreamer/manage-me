import type {IStoryValidator} from './interfaces/IStoryValidator.ts';
import {validateTextField} from './utils/FieldValidator.ts';

export class StoryValidator implements IStoryValidator {
    validateName(name: string, failCb: (msg: string) => void): void {
        validateTextField(name, "Story name", failCb);
    }

    validateDescription(description: string, failCb: (msg: string) => void): void {
        validateTextField(description, "Story description", failCb);
    }
}

const storyValidator = new StoryValidator();
export default storyValidator as IStoryValidator;
