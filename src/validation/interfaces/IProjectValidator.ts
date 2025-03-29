export interface IProjectValidator {
    validateProjectName(name: string, failCb: (failedMessage: string) => void): void;

    validateProjectDescription(description: string, failCb: (failedMessage: string) => void): void;

    validateStoryName(name: string, failCb: (failedMessage: string) => void): void;

    validateStoryDescription(description: string, failCb: (failedMessage: string) => void): void;
}
