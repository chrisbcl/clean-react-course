import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation<T = any> implements FieldValidation<T> {
    constructor(public readonly field: string) {}

    validate<D>(value: D): Error | null {
        return value ? null : new RequiredFieldError()
    }
}
