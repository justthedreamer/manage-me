export interface ITaskValidator {
    validateName(name: string, failCb: (msg: string) => void): void;

    validateDescription(description: string, failCb: (msg: string) => void): void;

    validateEstimatedFinishTime(hours: number, failCb: (msg: string) => void): void;

    validateEmployeeAssignment(option: string, selectedEmployee: unknown, failCb: (msg: string) => void): void;
}
