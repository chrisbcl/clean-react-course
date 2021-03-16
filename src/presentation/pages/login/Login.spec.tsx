import React from 'react'
import { ValidationSpy } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Login } from '..'

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
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
        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe('any_email')
    })

    it('should call validation with the correct password', () => {
        const {
            sut: { getByTestId },
            validationSpy
        } = makeSut()

        const passwordInput = getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe('any_password')
    })
})
