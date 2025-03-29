/**
 * Represents an application exception that occurs if provided argument is invalid.
 */
export class InvalidArgumentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidArgumentError";
        this.message = message;
        Object.setPrototypeOf(this, InvalidArgumentError.prototype);
    }
}