export interface FieldValidation {
    field: string
    validate: (input: { [key: string]: any }) => Error | null
}
