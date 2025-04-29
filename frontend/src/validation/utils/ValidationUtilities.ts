import type {ValidatorFn} from "../Validation.ts";
import type {User} from "../../model/entities/User.ts";

export function required(value: string): string {
    return value.trim() ? "" : "This field is required.";
}

export function minLength(value: string, length: number): string {
    return value.length >= length ? "" : `Minimum length is ${length} characters.`;
}

export function isEmail(value: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Invalid email address.";
}


export function positiveNumber(value: number): string {
    if (value <= 0) {
        return "Value must be greater than 0";
    }
    return "";
}

export function employeeAssigned(value: User | null): string {
    if (!value) {
        return "You must assign an employee.";
    }
    return "";
}

// Executes all validation rules from field.
export function fieldValidator<T>(value: T, validators: ValidatorFn<T>[]): string {
    for (const validator of validators) {
        const error = validator(value);
        if (error) return error; // Stop at first error
    }
    return '';
}

/**
 * Utility to handle validation errors in stores
 * @param validationErrors - Object containing field names as keys and error messages as values
 * @param errorStore - The store's error object (where errors will be saved)
 * @returns boolean - True if there are no validation errors, False if there are errors
 */
export function handleValidationErrors(validationErrors: Record<string, string>, errorStore: Record<string, string>): boolean {
    let isValid = true;

    // Loop through all validation errors and assign them to the store's error object
    Object.keys(validationErrors).forEach((field) => {
        const errorMessage = validationErrors[field];
        if (errorMessage) {
            errorStore[field] = errorMessage;
            isValid = false; // If there are any error messages, validation fails
        } else {
            errorStore[field] = ''; // Clear any previous error message if the field is now valid
        }
    });

    return isValid; // Return whether all fields are valid or not
}