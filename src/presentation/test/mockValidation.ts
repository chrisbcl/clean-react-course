import { Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
    errorMessage: any = 'error'

    validate<T = any>(fieldName: string, fieldValue: T): string {
        return this.errorMessage
    }
}
