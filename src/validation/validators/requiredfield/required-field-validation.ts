import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/errors'
import { isEmptyValue } from '../utils'

export class RequiredFieldValidation implements FieldValidation {
    constructor(public readonly field: string) {}

    validate(input: { [key: string]: any }): Error | null {
        return !isEmptyValue(input[this.field]) ? null : new RequiredFieldError()
    }
}
