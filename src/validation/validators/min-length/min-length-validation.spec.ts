import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (field: string = faker.database.column()): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
    it('should return error if value is invalid', () => {
        const field = faker.database.column()
        const sut = makeSut(field)

        const numberError = sut.validate(faker.random.number(4))
        expect(numberError).toEqual(new InvalidFieldError(field))

        const stringError = sut.validate(faker.random.alphaNumeric(4))
        expect(stringError).toEqual(new InvalidFieldError(field))
    })

    it('should return falsy if value is valid', () => {
        const sut = makeSut()

        const numberError = sut.validate(faker.random.number(5) + 5)
        expect(numberError).toBeFalsy()

        const stringError = sut.validate(faker.random.alphaNumeric(5))
        expect(stringError).toBeFalsy()
    })
})
