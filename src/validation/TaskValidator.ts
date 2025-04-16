import type {ITaskValidator} from "./interfaces/ITaskValidator.ts";

class TaskValidator implements ITaskValidator {
    validateName(name: string, failCb: (msg: string) => void): void {
        if (!name || name.trim().length < 5) {
            failCb("Task name should be at least 5 characters.");
        }
    }

    validateDescription(description: string, failCb: (msg: string) => void): void {
        if (!description || description.trim().length < 5) {
            failCb("Task description should be at least 5 characters.");
        }
    }

    validateEstimatedFinishTime(hours: number, failCb: (msg: string) => void): void {
        if (!hours || hours <= 0) {
            failCb("Estimated finish time must be greater than 0.");
        }
    }

    validateEmployeeAssignment(option: string, selectedEmployee: unknown, failCb: (msg: string) => void): void {
        if (option === "EMPLOYEE" && !selectedEmployee) {
            failCb("You must assign employee.");
        }
    }
}

const taskValidator = new TaskValidator();
export default taskValidator as ITaskValidator;
