import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
    constructor(public readonly field: string) {}

    validate<T = any>(value: T): Error | null {
        return new InvalidFieldError(this.field)
    }
}
