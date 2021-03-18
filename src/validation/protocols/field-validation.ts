export interface FieldValidation {
    field: string
    validate: <T = any>(value: T) => Error | null
}
