import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'
import { isEmptyValue } from '../utils'

export class EmailValidation implements FieldValidation {
    constructor(public readonly field: string) {}

    validate(input: { [key: string]: string }): Error | null {
        const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return isEmptyValue(input[this.field]) || emailRegEx.test(input[this.field])
            ? null
            : new InvalidFieldError(this.field)
    }
}
