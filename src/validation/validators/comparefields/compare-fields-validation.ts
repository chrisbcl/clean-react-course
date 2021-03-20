import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation<T = any> implements FieldValidation<T> {
    constructor(public readonly field: string, private readonly valueToCompare: T) {}

    validate(value: T): Error | null {
        return value === this.valueToCompare ? null : new InvalidFieldError(this.field)
    }
}
