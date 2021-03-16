import React from 'react'
import { Validation } from '@/presentation/protocols/validation'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Login } from '..'

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
    errorMessage: string = 'error'
    input: any

    validate<T = object>(input: T): string {
        this.input = input
        return this.errorMessage
    }
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = render(<Login validation={validationSpy} />)
    return { sut, validationSpy }
}

describe('<Login />', () => {
    afterEach(cleanup)

    it('should start with correct initial state', () => {
        const {
            sut: { getByTestId }
        } = makeSut()

        const errorWrap = getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const submitButton = getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)

        const emailStatus = getByTestId('email-status')
        expect(emailStatus.title).toBe('Required')
        expect(emailStatus.textContent).toBe('🔴')

        const passwordStatus = getByTestId('password-status')
        expect(passwordStatus.title).toBe('Required')
        expect(passwordStatus.textContent).toBe('🔴')
    })

    it('should call validation with the correct email', () => {
        const {
            sut: { getByTestId },
            validationSpy
        } = makeSut()

        const emailInput = getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        expect(validationSpy.input).toEqual({
            email: 'any_email'
        })
    })

    it('should call validation with the correct password', () => {
        const {
            sut: { getByTestId },
            validationSpy
        } = makeSut()

        const passwordInput = getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        expect(validationSpy.input).toEqual({
            password: 'any_password'
        })
    })
})
