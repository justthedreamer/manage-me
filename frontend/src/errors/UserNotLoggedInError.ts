/**
 * Represents an application exception that occurs if user is not logged in.
 */
export class UserNotLoggedInError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
        this.message = message;
        Object.setPrototypeOf(this, UserNotLoggedInError.prototype);
    }
}