import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
    constructor(public readonly field: string) {}

    validate<T = any>(value: T): Error | null {
        return value ? null : new RequiredFieldError()
    }
}
