import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { MinLengthValidation } from '../min-length/min-length-validation'

export class ValidationBuilder {
    private constructor(private readonly fieldName: string, private readonly fieldValidations: FieldValidation[]) {}

    static field(fieldName: string): ValidationBuilder {
        return new ValidationBuilder(fieldName, [])
    }

    required(): ValidationBuilder {
        this.fieldValidations.push(new RequiredFieldValidation(this.fieldName))
        return this
    }

    email(): ValidationBuilder {
        this.fieldValidations.push(new EmailValidation(this.fieldName))
        return this
    }

    min(length: number): ValidationBuilder {
        this.fieldValidations.push(new MinLengthValidation(this.fieldName, length))
        return this
    }

    build(): FieldValidation[] {
        return this.fieldValidations
    }
}
