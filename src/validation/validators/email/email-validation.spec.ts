import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import faker from 'faker'

const makeSut = (field: string = faker.database.column()): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
    it('should return error if mail is invalid', () => {
        const field = faker.database.column()
        const sut = makeSut(field)
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError(field))
    })

    it('should return falsy if mail is valid', () => {
        const sut = makeSut()
        const error = sut.validate(faker.internet.email())
        expect(error).toBeFalsy()
    })

    it('should return falsy if mail is empty', () => {
        const sut = makeSut()
        const error = sut.validate('')
        expect(error).toBeFalsy()
    })
})
