import React from 'react'
import { ValidationStub } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Login } from '..'
import faker from 'faker'

type SutTypes = {
    sut: RenderResult
    validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = faker.random.words()
    const sut = render(<Login validation={validationStub} />)
    return { sut, validationStub }
}

describe('<Login />', () => {
    afterEach(cleanup)

    it('should start with correct initial state', () => {
        const {
            sut: { getByTestId },
            validationStub
        } = makeSut()

        const errorWrap = getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)

        const submitButton = getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)

        const emailStatus = getByTestId('email-status')
        expect(emailStatus.title).toBe(validationStub.errorMessage)
        expect(emailStatus.textContent).toBe('🔴')

        const passwordStatus = getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationStub.errorMessage)
        expect(passwordStatus.textContent).toBe('🔴')
    })

    it('should call email error if validation fails', () => {
        const {
            sut: { getByTestId },
            validationStub
        } = makeSut()

        const emailInput = getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

        const emailStatus = getByTestId('email-status')
        expect(emailStatus.title).toBe(validationStub.errorMessage)
        expect(emailStatus.textContent).toBe('🔴')
    })

    it('should call password error if validation fails', () => {
        const {
            sut: { getByTestId },
            validationStub
        } = makeSut()

        const passwordInput = getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

        const passwordStatus = getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationStub.errorMessage)
        expect(passwordStatus.textContent).toBe('🔴')
    })
})
