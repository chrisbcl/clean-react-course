export interface Validation {
    validate: (fieldName: string, input: { [key: string]: any }) => string | null
}
