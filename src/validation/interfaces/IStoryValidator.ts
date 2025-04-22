export interface IStoryValidator {
    validateName(name: string, failCb: (msg: string) => void): void;

    validateDescription(description: string, failCb: (msg: string) => void): void;
}