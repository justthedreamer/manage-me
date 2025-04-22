export function validateTextField(
    value: string,
    fieldName: string,
    failCb: (msg: string) => void,
    minLength = 5
): void {
    if (!value || value.trim().length === 0) {
        failCb(`${fieldName} is required.`);
        return;
    }

    if (value.trim().length < minLength) {
        failCb(`${fieldName} must be at least ${minLength} characters long.`);
    }
}

export function validatePositiveNumber(
    value: number,
    fieldName: string,
    failCb: (msg: string) => void
): void {
    if (!value || value <= 0) {
        failCb(`${fieldName} must be greater than 0.`);
    }
}