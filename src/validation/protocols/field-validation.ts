export interface FieldValidation<T = any> {
    field: string
    validate: (value: T) => Error | null
}
