import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators'
import faker from 'faker'

const makeSut = (valueToCompare: any, field: string = faker.database.column()): CompareFieldsValidation =>
    new CompareFieldsValidation(field, valueToCompare)

describe('CompareFieldsValidation', () => {
    it('should return error if compare is invalid', () => {
        const field = faker.database.column()
        const sut = makeSut(faker.random.word(), field)
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError(field))
    })
})
