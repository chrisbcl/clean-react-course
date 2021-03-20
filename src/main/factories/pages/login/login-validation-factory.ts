import { ValidationBuilder } from '@/validation/validators/validationbuilder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validationcomposite/validation-composite'
import { Validation } from '@/presentation/protocols/validation'

export const makeLoginValidation = (): Validation => {
    return ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
    ])
}
