/**
 * Represents an application exception that occurs if requested data or entity was not found.
 */
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
        this.message = message;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}