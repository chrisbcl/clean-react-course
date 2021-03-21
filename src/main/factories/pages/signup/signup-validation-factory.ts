import { ValidationBuilder } from '@/validation/validators/validationbuilder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validationcomposite/validation-composite'
import { Validation } from '@/presentation/protocols/validation'

export const makeSignupValidation = (): Validation => {
    return ValidationComposite.build([
        ...ValidationBuilder.field('name').required().min(5).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
        ...ValidationBuilder.field('passwordConfirmation').required().min(5).sameAs('password').build()
    ])
}
