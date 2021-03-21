import { ValidationBuilder } from '@/validation/validators/validationbuilder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validationcomposite/validation-composite'
import { makeSignupValidation } from './signup-validation-factory'

describe('SignupValidationFactory', () => {
    it('should make ValidationComposite with correct validations', () => {
        const composite = makeSignupValidation()
        expect(composite).toEqual(
            ValidationComposite.build([
                ...ValidationBuilder.field('name').required().min(5).build(),
                ...ValidationBuilder.field('email').required().email().build(),
                ...ValidationBuilder.field('password').required().min(5).build(),
                ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build()
            ])
        )
    })
})
