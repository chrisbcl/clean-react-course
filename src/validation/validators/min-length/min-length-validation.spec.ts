import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
    it('should return error if value is invalid', () => {
        const field = faker.database.column()
        const sut = makeSut(field)

        const numberError = sut.validate({ [field]: faker.random.number(4) })
        expect(numberError).toEqual(new InvalidFieldError(field))

        const stringError = sut.validate({ [field]: faker.random.alphaNumeric(4) })
        expect(stringError).toEqual(new InvalidFieldError(field))
    })

    it('should return falsy if value is valid', () => {
        const field = faker.database.column()
        const sut = makeSut(field)

        const numberError = sut.validate({ [field]: faker.random.number(5) + 5 })
        expect(numberError).toBeFalsy()

        const stringError = sut.validate({ [field]: faker.random.alphaNumeric(5) })
        expect(stringError).toBeFalsy()
    })

    it('should return falsy if field does not exist on schema', () => {
        const sut = makeSut(faker.database.column())

        const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
        expect(error).toBeFalsy()
    })
})
