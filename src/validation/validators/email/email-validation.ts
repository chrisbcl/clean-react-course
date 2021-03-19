import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'
import { isEmptyValue } from '../utils'

export class EmailValidation implements FieldValidation<string> {
    constructor(public readonly field: string) {}

    validate(value: string): Error | null {
        const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return isEmptyValue(value) || emailRegEx.test(value) ? null : new InvalidFieldError(this.field)
    }
}
