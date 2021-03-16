import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
    errorMessage: string = 'error'
    fieldName: string = ''
    fieldValue: any

    validate<T = any>(fieldName: string, fieldValue: T): string {
        this.fieldName = fieldName
        this.fieldValue = fieldValue
        return this.errorMessage
    }
}
