/**
 * Represents an application error that occurs if some entity already exists.
 */
export class AlreadyExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AlreadyExistError";
        this.message = message;
        Object.setPrototypeOf(this, AlreadyExistsError.prototype);
    }
}