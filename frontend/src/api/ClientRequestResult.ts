export interface ClientRequestResult<Type> {
    requestResult: Type | null;
    message: string;
    isSuccess: boolean;
}

export function genericInternalServerErrorClientRequestResult<Type>(): ClientRequestResult<Type> {
    return {
        requestResult: null,
        message: "An internal server error occurred.",
        isSuccess: false
    };
}

export function genericUnauthorizedClientRequestResult<Type>(): ClientRequestResult<Type> {
    return {
        requestResult: null,
        message: "Unauthorized",
        isSuccess: false
    }
}