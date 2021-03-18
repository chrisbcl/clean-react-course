import { Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
    errorMessage: string | null = 'error'

    validate<T = any>(fieldName: string, fieldValue: T): string | null {
        return this.errorMessage
    }
}
