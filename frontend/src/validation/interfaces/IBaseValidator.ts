import type {ValidationRules} from "../Validation.ts";


export interface IBaseValidator<TFields> {
    rules: ValidationRules<TFields>;

    validateFieldByName<K extends keyof TFields>(key: K, value: TFields[K]): string;

    validateAll(fields: TFields): Partial<Record<keyof TFields, string>>;
}
