import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
    constructor(public readonly field: string, private readonly fieldToCompare: string) {}

    validate(input: { [key: string]: any }): Error | null {
        return input[this.field] === input[this.fieldToCompare] ? null : new InvalidFieldError(this.field)
    }
}
