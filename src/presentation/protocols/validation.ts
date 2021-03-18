export interface Validation {
    validate: <T = any>(fieldName: string, fieldValue: T) => string | null
}
