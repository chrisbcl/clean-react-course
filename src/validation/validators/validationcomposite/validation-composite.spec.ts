import { FieldValidationSpy } from '../test/mockFieldValidation'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
    it('should return error if any validation fails', () => {
        const validationSpy1 = new FieldValidationSpy('any_field')
        validationSpy1.error = new Error('first_error_message')
        const validationSpy2 = new FieldValidationSpy('any_field')
        validationSpy2.error = new Error('second_error_message')

        const sut = new ValidationComposite([validationSpy1, validationSpy2])

        const error = sut.validate('any_field', 'any_value')

        expect(error).toBe('first_error_message')
    })
})
