import {type ValidationRules} from "../Validation.ts";
import {fieldValidator} from "../utils/ValidationUtilities.ts";

export abstract class BaseValidator<TFields extends Record<string, any>> {
    abstract rules: ValidationRules<TFields>;

    validateFieldByName<K extends keyof TFields>(key: K, value: TFields[K]): string {
        return fieldValidator(value, this.rules[key]);
    }

    validateAll(fields: TFields): Partial<Record<keyof TFields, string>> {
        const errors: Partial<Record<keyof TFields, string>> = {};

        for (const key in fields) {
            const field = key as keyof TFields;
            const error = this.validateFieldByName(field, fields[field]);
            if (error) {
                errors[field] = error;
            }
        }

        return errors;
    }
}
