import type {IProjectValidator} from "./interfaces/IProjectValidator.ts";
import {validateTextField} from "./utils/FieldValidator.ts";

class ProjectValidator implements IProjectValidator {
    validateProjectName(name: string, failCb: (msg: string) => void): void {
        validateTextField(name, "Project name", failCb);
    }

    validateProjectDescription(description: string, failCb: (msg: string) => void): void {
        validateTextField(description, "Project description", failCb);
    }

    validateStoryName(name: string, failCb: (msg: string) => void): void {
        validateTextField(name, "Story name", failCb);
    }

    validateStoryDescription(description: string, failCb: (msg: string) => void): void {
        validateTextField(description, "Story description", failCb);
    }
}

const projectValidator = new ProjectValidator();
export default projectValidator as IProjectValidator;
