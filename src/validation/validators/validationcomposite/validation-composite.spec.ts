import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'
import faker from 'faker'

type SutTypes = {
    sut: ValidationComposite
    fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
    const fieldValidationSpies = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)]
    const sut = ValidationComposite.build(fieldValidationSpies)

    return { sut, fieldValidationSpies }
}

describe('ValidationComposite', () => {
    it('should return error if any validation fails', () => {
        const fieldName = faker.database.column()
        const { sut, fieldValidationSpies } = makeSut(fieldName)

        const firstError = faker.random.words()
        fieldValidationSpies[0].error = new Error(firstError)
        fieldValidationSpies[1].error = new Error(faker.random.words())

        const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })

        expect(error).toBe(firstError)
    })

    it('should return falsy if validation succeeds', () => {
        const fieldName = faker.database.column()
        const { sut } = makeSut(fieldName)
        const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })

        expect(error).toBeFalsy()
    })
})
