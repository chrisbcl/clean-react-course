import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import faker from 'faker'

describe('EmailValidation', () => {
    it('should return error if mail is invalid', () => {
        const field = faker.random.word()
        const sut = new EmailValidation(field)
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError(field))
    })

    it('should return falsy if mail is valid', () => {
        const sut = new EmailValidation(faker.random.word())
        const error = sut.validate(faker.internet.email())
        expect(error).toBeFalsy()
    })
})
