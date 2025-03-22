import type {IProjectValidator} from "./interfaces/IProjectValidator.ts";

class ProjectValidator implements IProjectValidator {
    validateProjectDescription(description: string, failCb: (failedMessage: string) => void): void {
        if (!description) failCb("Project description is required.");

        if (description.trim().length < 5) failCb("Project description must be at least 5 characters long.");
    }

    validateProjectName(name: string, failCb: (failedMessage: string) => void): void {
        if (!name) failCb("Project name is required.");

        if (name.trim().length < 5) failCb("Project name must be at least 5 characters long.");
    }

    validateStoryDescription(description: string, failCb: (failedMessage: string) => void): void {
        if (!description) failCb("Project description is required!");

        if (description.trim().length < 5) failCb("Story description must be at least 5 characters long.");
    }

    validateStoryName(name: string, failCb: (failedMessage: string) => void): void {
        if (!name) failCb("Project name is required!");

        if (name.trim().length < 5) failCb("Story name must be at least 5 characters long.");
    }
}

const validator = new ProjectValidator();
export default validator as IProjectValidator;