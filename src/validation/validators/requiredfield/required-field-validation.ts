import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/errors'
import { isEmptyValue } from '../utils'

export class RequiredFieldValidation<T = any> implements FieldValidation<T> {
    constructor(public readonly field: string) {}

    validate<D>(value: D): Error | null {
        return !isEmptyValue(value) ? null : new RequiredFieldError()
    }
}
