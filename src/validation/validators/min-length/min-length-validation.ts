import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation<number | string> {
    constructor(public readonly field: string, private readonly minLength: number) {}
    validate(value: number | string): Error | null {
        if (typeof value === 'number') {
            return value >= this.minLength ? null : new InvalidFieldError(this.field)
        }

        return value.length >= this.minLength ? null : new InvalidFieldError(this.field)
    }
}
