import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'
import faker from 'faker'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation =>
    new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
    it('should return error if compare is invalid', () => {
        const field = faker.database.column()
        const fieldToCompare = faker.database.column()
        const sut = makeSut(field, fieldToCompare)
        const error = sut.validate({ [field]: faker.random.word(), [fieldToCompare]: faker.random.word() })
        expect(error).toEqual(new InvalidFieldError(field))
    })

    it('should return falsy if value is valid', () => {
        const field = faker.database.column()
        const fieldToCompare = faker.database.column()
        const value = faker.random.word()
        const sut = makeSut(field, fieldToCompare)

        const error = sut.validate({ [field]: value, [fieldToCompare]: value })
        expect(error).toBeFalsy()
    })
})
