import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'
import { isEmptyValue } from '../utils'

export class MinLengthValidation implements FieldValidation {
    constructor(public readonly field: string, private readonly minLength: number) {}

    validate(input: { [key: string]: number | string }): Error | null {
        const value = input[this.field]

        if (isEmptyValue(value)) {
            return null
        }

        if (typeof value === 'number') {
            return value >= this.minLength ? null : new InvalidFieldError(this.field)
        }

        return value.length >= this.minLength ? null : new InvalidFieldError(this.field)
    }
}
