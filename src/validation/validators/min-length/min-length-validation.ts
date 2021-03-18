import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation<number | string> {
    constructor(public readonly field: string, private readonly minLength: number) {}
    validate(value: number | string): Error | null {
        return new InvalidFieldError(this.field)
    }
}
