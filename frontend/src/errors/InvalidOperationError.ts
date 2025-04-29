/**
 * Represents an application exception that occurs if some operation cannot be performed.
 */
export class InvalidOperationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidOperationError";
        this.message = message;
        Object.setPrototypeOf(this, InvalidOperationError.prototype);
    }
}