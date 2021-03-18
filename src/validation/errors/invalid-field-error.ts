export class InvalidFieldError extends Error {
    constructor(private readonly fieldName: string) {
        super(`The field ${fieldName} is invalid`)
        this.name = 'InvalidFieldError'
    }
}
