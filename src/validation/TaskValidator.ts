import type { ITaskValidator } from "./interfaces/ITaskValidator.ts";
import { validateTextField, validatePositiveNumber } from "./utils/FieldValidator.ts";

class TaskValidator implements ITaskValidator {
    validateName(name: string, failCb: (msg: string) => void): void {
        validateTextField(name, "Task name", failCb);
    }

    validateDescription(description: string, failCb: (msg: string) => void): void {
        validateTextField(description, "Task description", failCb);
    }

    validateEstimatedFinishTime(hours: number, failCb: (msg: string) => void): void {
        validatePositiveNumber(hours, "Estimated finish time", failCb);
    }

    validateEmployeeAssignment(option: string, selectedEmployee: unknown, failCb: (msg: string) => void): void {
        if (option === "EMPLOYEE" && !selectedEmployee) {
            failCb("You must assign an employee.");
        }
    }
}

const taskValidator = new TaskValidator();
export default taskValidator as ITaskValidator;
