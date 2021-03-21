import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
    error: Error | null = null

    constructor(public readonly field: string) {}

    validate(input: { [key: string]: any }): Error | null {
        return this.error
    }
}
