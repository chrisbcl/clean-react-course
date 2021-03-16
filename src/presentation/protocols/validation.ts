export interface Validation {
    validate: <T = object>(input: T) => string
}
