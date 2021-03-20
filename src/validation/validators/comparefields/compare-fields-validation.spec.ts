import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'
import faker from 'faker'

const makeSut = <T>(valueToCompare: T, field: string = faker.database.column()): CompareFieldsValidation<T> =>
    new CompareFieldsValidation<T>(field, valueToCompare)

describe('CompareFieldsValidation', () => {
    it('should return error if compare is invalid', () => {
        const field = faker.database.column()
        const sut = makeSut(faker.random.word(), field)
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError(field))
    })

    it('should return falsy if value is valid', () => {
        const valueToCompare = faker.random.word()
        const sut = makeSut(valueToCompare)

        const error = sut.validate(valueToCompare)
        expect(error).toBeFalsy()
    })
})
