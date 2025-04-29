// Each validator takes a value and returns an error message (empty string if valid)
export type ValidatorFn<T = any> = (value: T) => string;

// Validation rules are a map: field name → array of validators
export type ValidationRules<TFields> = {
    [K in keyof TFields]: ValidatorFn<TFields[K]>[];
};
